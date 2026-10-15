/** Rendu Markdown minimal et sûr (gras, italique, code, liens, listes, titres) : aucun HTML injecté. */
const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
const SAFE_LINK = /^(https?:\/\/|\/|#|mailto:)/i;

function Inline({ text }) {
  return text
    .split(INLINE_RE)
    .filter(Boolean)
    .map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i} className="font-semibold text-[var(--text)]">{part.slice(2, -2)}</strong>;
      if (/^\*[^*]+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
      if (/^`[^`]+`$/.test(part)) {
        return <code key={i} className="bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--text)]">{part.slice(1, -1)}</code>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) {
        return SAFE_LINK.test(link[2]) ? (
          <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] underline">{link[1]}</a>
        ) : (
          <span key={i}>{link[1]}</span>
        );
      }
      return <span key={i}>{part}</span>;
    });
}

const HEADING = /^(#{1,3})\s+(.+)$/;

export default function MarkdownText({ text, className = '' }) {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((block, i) => {
        const lines = block.split('\n');

        if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
          return (
            <ul key={i} className="list-disc space-y-1 pl-5">
              {lines.map((l, j) => <li key={j}><Inline text={l.replace(/^\s*[-*]\s+/, '')} /></li>)}
            </ul>
          );
        }

        const heading = lines[0].match(HEADING);
        if (heading) {
          const rest = lines.slice(1).join('\n');
          return (
            <div key={i} className="space-y-1.5">
              <p className={`font-display font-semibold text-[var(--text)] ${heading[1].length === 1 ? 'text-lg' : 'text-base'}`}>
                <Inline text={heading[2]} />
              </p>
              {rest && <p className="whitespace-pre-line"><Inline text={rest} /></p>}
            </div>
          );
        }

        return <p key={i} className="whitespace-pre-line"><Inline text={block} /></p>;
      })}
    </div>
  );
}
