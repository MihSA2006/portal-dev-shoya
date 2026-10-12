import { useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import ProjectIcon from './Downloads/ProjectIcon.jsx';
import StageBadge from './StageBadge.jsx';

const ProjectList = ({ projects, selectedId, onSelect }) => {
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => !q || p.name.toLowerCase().includes(q) || p.prefix.toLowerCase().includes(q));
  }, [projects, query]);

  return (
    <div className="floating lg:h-full lg:min-h-0">
      <aside className="cut-frame p-5 lg:h-full lg:overflow-y-auto">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-lg font-semibold">Projets</h2>
          <span className="border border-[var(--border-strong)] bg-[var(--accent-tint)] px-2 text-xs font-medium text-[var(--accent)]">
            {projects.length}
          </span>
        </div>

        <label className="field mt-4">
          <Search size={17} className="shrink-0 text-[var(--accent)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet..."
            aria-label="Rechercher un projet"
          />
        </label>

        <ul className="mt-4 space-y-3">
          {visible.map((p) => {
            const active = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelect(p.id)}
                  aria-current={active}
                  className={`flex w-full items-center gap-3 border p-3 text-left transition-colors ${
                    active
                      ? 'border-[var(--accent)] bg-[var(--accent-tint)] shadow-[0_0_18px_var(--accent-glow)]'
                      : 'border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <ProjectIcon project={p} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--text)]">{p.name}</span>
                    <span className="mb-1 block text-xs text-[var(--text-muted)]">{p.prefix}</span>
                    <StageBadge stage={p.stage} />
                  </span>
                  <ChevronRight size={17} className="shrink-0 text-[var(--text-muted)]" />
                </button>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 && (
          <p className="py-8 text-center text-sm text-[var(--text-muted)]">Aucun projet ne correspond à « {query} ».</p>
        )}
      </aside>
    </div>
  );
};

export default ProjectList;
