/**
 * Actions de la barre d'outils Markdown : fonctions pures.
 * applyAction(action, value, start, end) -> { from, to, text, selStart, selEnd } ou null
 * (remplacer value[from..to] par text, puis sélectionner selStart..selEnd dans le nouveau texte).
 */

const lineBounds = (value, start, end) => {
  const lineStart = start === 0 ? 0 : value.lastIndexOf('\n', start - 1) + 1;
  const effEnd = end > start && value[end - 1] === '\n' ? end - 1 : end;
  const nl = value.indexOf('\n', effEnd);
  return [lineStart, nl === -1 ? value.length : nl];
};

const wrap = (value, start, end, marker, placeholder, single = false) => {
  const m = marker.length;
  const selected = value.slice(start, end);
  const already =
    start >= m &&
    value.slice(start - m, start) === marker &&
    value.slice(end, end + m) === marker &&
    !(single && (value[start - m - 1] === marker || value[end + m] === marker));
  if (already) {
    return { from: start - m, to: end + m, text: selected, selStart: start - m, selEnd: start - m + selected.length };
  }
  const inner = selected || placeholder;
  return { from: start, to: end, text: marker + inner + marker, selStart: start + m, selEnd: start + m + inner.length };
};

const mapLines = (value, start, end, fn, keepCaret = false) => {
  const [ls, le] = lineBounds(value, start, end);
  const lines = value.slice(ls, le).split('\n');
  const text = fn(lines).join('\n');
  if (start === end && keepCaret) {
    const caret = Math.max(ls, Math.min(ls + text.length, start + (text.length - (le - ls))));
    return { from: ls, to: le, text, selStart: caret, selEnd: caret };
  }
  const multi = lines.length > 1;
  return { from: ls, to: le, text, selStart: multi ? ls : ls + text.length, selEnd: ls + text.length };
};

const TABLE = '| Colonne 1 | Colonne 2 |\n| --- | --- |\n| Valeur | Valeur |\n';

export const applyAction = (action, value, start, end) => {
  const selected = value.slice(start, end);

  switch (action) {
    case 'bold':
      return wrap(value, start, end, '**', 'texte en gras');
    case 'italic':
      return wrap(value, start, end, '*', 'texte en italique', true);
    case 'heading':
      return mapLines(value, start, end, (lines) => {
        const all = lines.every((l) => /^# /.test(l));
        return lines.map((l) => (all ? l.replace(/^# /, '') : `# ${l.replace(/^#{1,6}\s+/, '')}`));
      });
    case 'quote':
      return mapLines(value, start, end, (lines) => {
        const all = lines.every((l) => /^>/.test(l));
        return lines.map((l) => (all ? l.replace(/^>\s?/, '') : l ? `> ${l}` : '>'));
      });
    case 'link': {
      const label = selected || 'texte du lien';
      const text = `[${label}](https://)`;
      const selStart = start + label.length + 3;
      return { from: start, to: end, text, selStart, selEnd: selStart + 8 };
    }
    case 'image': {
      const alt = selected || 'description';
      const text = `![${alt}](https://)`;
      const selStart = start + alt.length + 4;
      return { from: start, to: end, text, selStart, selEnd: selStart + 8 };
    }
    case 'code':
      if (selected.includes('\n')) {
        const text = `\`\`\`\n${selected}\n\`\`\``;
        return { from: start, to: end, text, selStart: start + 4, selEnd: start + 4 + selected.length };
      }
      return wrap(value, start, end, '`', 'code');
    case 'table': {
      const prefix = start > 0 && value[start - 1] !== '\n' ? '\n' : '';
      const selStart = start + prefix.length + 2;
      return { from: start, to: end, text: prefix + TABLE, selStart, selEnd: selStart + 9 };
    }
    case 'indent':
      if (start === end) return { from: start, to: end, text: '  ', selStart: start + 2, selEnd: start + 2 };
      return mapLines(value, start, end, (lines) => lines.map((l) => `  ${l}`));
    case 'outdent':
      return mapLines(value, start, end, (lines) => lines.map((l) => l.replace(/^( {1,2}|\t)/, '')), true);
    default:
      return null;
  }
};
