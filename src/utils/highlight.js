// Groupes : 1 commentaire, 2 chaîne, 3 variable ($x), 4 nombre, 5 mot-clé, 6 fonction.
// Les commentaires ne sont reconnus qu'en début de ligne (évite de colorer "//" dans une URL).
const RE =
  /(^\s*\/\/.*$|^#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\$\w+)|\b(\d+(?:\.\d+)?)\b|\b(const|await|async|return|true|false|null|echo)\b|\b(curl_\w+|json_encode|fetch|console\.log|JSON\.stringify|curl)\b/g;

const KINDS = [null, 'comment', 'string', 'variable', 'number', 'keyword', 'fn'];

/** Découpe une ligne de code en segments { text, kind } (kind null = texte simple). */
export const tokenize = (line) => {
  const out = [];
  let last = 0;
  for (const m of line.matchAll(RE)) {
    if (m.index > last) out.push({ text: line.slice(last, m.index), kind: null });
    out.push({ text: m[0], kind: KINDS[m.slice(1).findIndex(Boolean) + 1] });
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push({ text: line.slice(last), kind: null });
  return out;
};
