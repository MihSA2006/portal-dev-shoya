import { Link } from 'react-router-dom';
import { AlertTriangle, Info, ShieldAlert, StickyNote } from 'lucide-react';
import { CALLOUTS } from '../../utils/markdown';
import { renderInline } from './MarkdownView';

const ICONS = { TIP: Info, NOTE: StickyNote, IMPORTANT: AlertTriangle, WARNING: ShieldAlert };

const Box = ({ title, children }) => (
  <section className="border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
    <h3 className="mb-3 text-sm font-semibold text-[var(--accent)]">{title}</h3>
    {children}
  </section>
);

/** Colonne latérale de l'aperçu : encadrés, sujets liés (autres guides du projet) et sommaire. */
const GuideAside = ({ callouts, related, headings, onGoTo }) => {
  const toc = headings.filter((h) => h.level === 2);

  return (
    <aside className="space-y-4" aria-label="Informations complémentaires">
      {callouts.map((c, i) => {
        const { title, tone } = CALLOUTS[c.kind];
        const Icon = ICONS[c.kind];
        return (
          <div key={i} data-tone={tone} className="border border-[var(--tone)] bg-[color-mix(in_srgb,var(--tone)_10%,transparent)] p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--tone)]"><Icon size={16} /> {title}</p>
            <p className="text-sm leading-6 text-[var(--text-soft)]">{renderInline(c.children)}</p>
          </div>
        );
      })}

      {related.length > 0 && (
        <Box title="Sujets liés">
          <ul className="space-y-2 text-sm">
            {related.map((g) => (
              <li key={g.id}>
                <Link to={`/guides/${g.id}`} className="text-[var(--cyan)] hover:underline">{g.title} →</Link>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {toc.length > 0 && (
        <Box title="Table des matières">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--text-soft)]">
            {toc.map((h) => (
              <li key={h.id}>
                <button type="button" onClick={() => onGoTo(h.id)} className="text-left hover:text-[var(--accent)]">{h.text.replace(/^\d+[.)]\s*/, '')}</button>
              </li>
            ))}
          </ol>
        </Box>
      )}
    </aside>
  );
};

export default GuideAside;
