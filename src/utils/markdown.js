/**
 * Mini-parseur Markdown (sans dépendance, sans HTML brut : tout est rendu en éléments React).
 * Pris en charge : titres, paragraphes, listes (puces, numérotées, tâches), citations, encadrés
 * (> [!TIP] / NOTE / IMPORTANT / WARNING), blocs de code, tableaux, séparateurs, et en ligne :
 * **gras**, *italique*, `code`, [lien](url), ![image](url). Les listes imbriquées ne sont pas gérées.
 */

export const CALLOUTS = {
  TIP: { title: 'Astuce', tone: 'cyan' },
  NOTE: { title: 'Note', tone: 'lead' },
  IMPORTANT: { title: 'Important', tone: 'admin' },
  WARNING: { title: 'Attention', tone: 'danger' },
};

const slug = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';

/** Refuse tout protocole dangereux (javascript:, data:...) : renvoie null si l'URL n'est pas sûre. */
export const safeUrl = (url) => (/^(https?:\/\/|mailto:|#|\/)/i.test(url) ? url : null);
export const safeImageUrl = (url) => (/^https?:\/\//i.test(url) ? url : null);

// ---------- en ligne ----------
const INLINE_RE = /`([^`]+)`|\*\*([^*]+?)\*\*|\*([^*\s][^*]*?)\*|(!)?\[([^\]]*)\]\(([^)\s]+)\)/g;

export const parseInline = (text) => {
  const nodes = [];
  let last = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    if (m.index > last) nodes.push({ type: 'text', text: text.slice(last, m.index) });
    if (m[1] !== undefined) nodes.push({ type: 'code', text: m[1] });
    else if (m[2] !== undefined) nodes.push({ type: 'bold', children: parseInline(m[2]) });
    else if (m[3] !== undefined) nodes.push({ type: 'italic', children: parseInline(m[3]) });
    else if (m[4]) nodes.push({ type: 'image', alt: m[5], url: m[6] });
    else nodes.push({ type: 'link', children: parseInline(m[5]), url: m[6] });
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push({ type: 'text', text: text.slice(last) });
  return nodes;
};

const plainText = (text) => text.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*]/g, '');

// ---------- blocs ----------
const FENCE = /^\s*(`{3,}|~{3,})\s*([\w+#.-]*)/;
const HEADING = /^(#{1,6})\s+(.*?)\s*#*\s*$/;
const HR = /^\s*([-*_])(\s*\1){2,}\s*$/;
const LIST = /^\s*([-*+]|\d+[.)])\s+(.*)$/;
const QUOTE = /^\s*>/;
const TABLE_SEP = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
const CALLOUT = /^\[!(TIP|NOTE|IMPORTANT|WARNING)\]\s*(.*)$/i;

const splitRow = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

const startsBlock = (line, next) =>
  FENCE.test(line) || HEADING.test(line) || HR.test(line) || LIST.test(line) || QUOTE.test(line) ||
  (line.includes('|') && next !== undefined && TABLE_SEP.test(next));

/** Retourne { blocks, headings, callouts } ; les encadrés sont extraits des blocs (affichés dans la colonne latérale). */
export const parseMarkdown = (src) => {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const blocks = [];
  const headings = [];
  const callouts = [];
  const used = new Map();
  const uid = (text) => {
    const base = slug(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }

    const fence = line.match(FENCE);
    if (fence) {
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith(fence[1])) { code.push(lines[i]); i += 1; }
      i += 1;
      blocks.push({ type: 'code', lang: fence[2], code: code.join('\n') });
      continue;
    }

    const heading = line.match(HEADING);
    if (heading) {
      const text = plainText(heading[2]);
      const id = uid(text);
      headings.push({ level: heading[1].length, id, text });
      blocks.push({ type: 'heading', level: heading[1].length, id, children: parseInline(heading[2]) });
      i += 1;
      continue;
    }

    if (HR.test(line)) { blocks.push({ type: 'hr' }); i += 1; continue; }

    if (line.includes('|') && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1])) {
      const head = splitRow(line).map(parseInline);
      const rows = [];
      i += 2;
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) { rows.push(splitRow(lines[i]).map(parseInline)); i += 1; }
      blocks.push({ type: 'table', head, rows });
      continue;
    }

    if (QUOTE.test(line)) {
      const quote = [];
      while (i < lines.length && QUOTE.test(lines[i])) { quote.push(lines[i].replace(/^\s*>\s?/, '')); i += 1; }
      const callout = quote[0].trim().match(CALLOUT);
      if (callout) {
        const text = [callout[2], ...quote.slice(1)].map((l) => l.trim()).filter(Boolean).join(' ');
        callouts.push({ kind: callout[1].toUpperCase(), children: parseInline(text) });
      } else {
        blocks.push({ type: 'quote', children: parseInline(quote.map((l) => l.trim()).filter(Boolean).join(' ')) });
      }
      continue;
    }

    const list = line.match(LIST);
    if (list) {
      const ordered = /\d/.test(list[1]);
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(LIST);
        if (!m || /\d/.test(m[1]) !== ordered || HR.test(lines[i])) break;
        const task = m[2].match(/^\[( |x|X)\]\s+(.*)$/);
        items.push({ checked: task ? task[1] !== ' ' : null, children: parseInline(task ? task[2] : m[2]) });
        i += 1;
      }
      blocks.push({ type: 'list', ordered, items });
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && (para.length === 0 || !startsBlock(lines[i], lines[i + 1]))) {
      para.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'paragraph', children: parseInline(para.join(' ')) });
  }

  return { blocks, headings, callouts };
};

// ---------- coloration de l'éditeur (par ligne) ----------
const HL_RE = /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\*[^*\s][^*]*?\*)|(!?\[[^\]]*\]\([^)\s]+\))/g;
const HL_KINDS = [null, 'inlineCode', 'bold', 'italic', 'link'];

/** Segments { text, kind } d'une ligne + nouvel état "dans un bloc de code". La largeur du texte n'est jamais modifiée. */
export const highlightLine = (line, inFence) => {
  if (FENCE.test(line)) return { segments: [{ text: line, kind: 'fence' }], inFence: !inFence };
  if (inFence) return { segments: [{ text: line, kind: 'code' }], inFence };
  if (HEADING.test(line)) return { segments: [{ text: line, kind: 'heading' }], inFence };
  if (QUOTE.test(line)) return { segments: [{ text: line, kind: 'quote' }], inFence };
  if (HR.test(line)) return { segments: [{ text: line, kind: 'hr' }], inFence };

  const segments = [];
  let rest = line;
  const marker = line.match(/^(\s*(?:[-*+]|\d+[.)])\s)/);
  if (marker && !HR.test(line)) {
    segments.push({ text: marker[1], kind: 'marker' });
    rest = line.slice(marker[1].length);
  }
  let last = 0;
  for (const m of rest.matchAll(HL_RE)) {
    if (m.index > last) segments.push({ text: rest.slice(last, m.index), kind: null });
    segments.push({ text: m[0], kind: HL_KINDS[m.slice(1).findIndex(Boolean) + 1] });
    last = m.index + m[0].length;
  }
  if (last < rest.length) segments.push({ text: rest.slice(last), kind: null });
  return { segments, inFence };
};
