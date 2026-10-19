import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import StatusPill from '../endpoints/StatusPill';
import { getProjectSlug } from '../../utils/documentation';

/** Liste simple des guides : nom + projet lié (pas de tableau). */
const GuideList = ({ guides, projects }) => {
  const sorted = [...guides].sort((a, b) => b.updatedAt - a.updatedAt);
  const getProject = (id) => projects.find((p) => p.id === id);

  return (
      <section className="p-5" aria-labelledby="guides-title">
        <h2 id="guides-title" className="mb-4 flex items-center gap-3 font-display text-lg font-semibold">
          Guides existants
          <span className="border border-[var(--border-strong)] bg-[var(--accent-tint)] px-2 text-xs font-medium text-[var(--accent)]">{guides.length}</span>
        </h2>

        {sorted.length === 0 ? (
          <p className="py-10 text-center text-sm text-[var(--text-muted)]">Aucun guide pour le moment.</p>
        ) : (
          <ul className="space-y-3">
            {sorted.map((guide) => (
              <li key={guide.id}>
                <Link
                  to={getProject(guide.projectId)
                    ? `/documentation/${getProjectSlug(getProject(guide.projectId))}/guides/${guide.id}`
                    : `/guides/${guide.id}`}
                  className="flex items-center gap-4 border border-[var(--border)] bg-[var(--bg-elevated)] p-3.5 transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface-2)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
                    <BookOpen size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--text)]">{guide.title}</span>
                    <span className="block truncate text-xs text-[var(--text-muted)]">Projet : {getProject(guide.projectId)?.name ?? 'Projet supprimé'}</span>
                  </span>
                  {guide.status === 'draft' && <StatusPill tone="admin" label="Brouillon" />}
                  <ChevronRight size={17} className="shrink-0 text-[var(--text-muted)]" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
  );
};

export default GuideList;
