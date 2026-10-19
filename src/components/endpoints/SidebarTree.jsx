import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';
import { METHOD_TONES } from '../../constants/documentation';
import { endpointPath } from '../../utils/endpointLinks';

const MethodTag = ({ method }) => (
  <span data-tone={METHOD_TONES[method]} className="tone-badge w-12 shrink-0 py-0.5 text-center text-[9px] font-bold">{method}</span>
);

const Count = ({ children }) => (
  <span className="grid h-5 min-w-5 shrink-0 place-items-center bg-[var(--surface-2)] px-1 text-[11px] text-[var(--text-soft)]">{children}</span>
);

/**
 * Arbre projet > section > endpoints.
 * Chevron = déplier ; libellé = filtrer la liste principale ; endpoint = ouvrir sa documentation.
 */
const SidebarTree = ({ projects, getCategories, filters, onFilter, onNavigate }) => {
  const [open, setOpen] = useState(() => new Set(
    projects.flatMap((project) => [
      `p:${project.id}`,
      ...getCategories(project.id).map((category) => `s:${project.id}:${category.id}`),
    ])
  ));

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const visible = filters.project === 'all' ? projects : projects.filter((p) => String(p.id) === filters.project);

  if (visible.length === 0) return <p className="px-3 py-4 text-xs text-[var(--text-muted)]">Aucun projet.</p>;

  return (
    <ul className="space-y-1">
      {visible.map((project) => {
        const categories = getCategories(project.id);
        const pKey = `p:${project.id}`;
        const pOpen = open.has(pKey);
        const pActive = filters.project === String(project.id) && filters.section === 'all';
        const total = categories.reduce((n, c) => n + c.endpoints.length, 0);

        return (
          <li key={project.id}>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => toggle(pKey)} aria-expanded={pOpen} aria-label={`${pOpen ? 'Replier' : 'Déplier'} ${project.name}`} className="icon-btn !h-8 !w-6">
                {pOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
              </button>
              <button
                type="button"
                onClick={() => onFilter({ project: String(project.id), section: 'all' })}
                className={`flex h-8 min-w-0 flex-1 items-center gap-2 px-1.5 text-left text-[13px] font-medium transition-colors ${pActive ? 'text-[var(--accent)]' : 'text-[var(--text)] hover:text-[var(--accent)]'}`}
              >
                <Folder size={16} className="shrink-0 text-[var(--accent)]" />
                <span className="flex-1 truncate">{project.name}</span>
                <Count>{total}</Count>
              </button>
            </div>

            {pOpen && (
              <ul className="animate-enter ml-3 mt-0.5 space-y-0.5 border-l border-[var(--border-strong)] pl-2">
                {categories.length === 0 && <li className="px-2 py-1.5 text-xs text-[var(--text-muted)]">Aucun endpoint.</li>}
                {categories.map((category) => {
                  const sKey = `s:${project.id}:${category.id}`;
                  const sOpen = open.has(sKey);
                  const sActive = filters.project === String(project.id) && filters.section === category.name;
                  return (
                    <li key={category.id}>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => toggle(sKey)} aria-expanded={sOpen} aria-label={`${sOpen ? 'Replier' : 'Déplier'} ${category.name}`} className="icon-btn !h-7 !w-6">
                          {sOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => onFilter({ project: String(project.id), section: category.name })}
                          className={`flex h-7 min-w-0 flex-1 items-center gap-2 px-1.5 text-left text-xs transition-colors ${sActive ? 'font-medium text-[var(--accent)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'}`}
                        >
                          <FileText size={14} className="shrink-0" />
                          <span className="flex-1 truncate">{category.name}</span>
                          <Count>{category.endpoints.length}</Count>
                        </button>
                      </div>

                      {sOpen && (
                        <ul className="animate-enter ml-3 space-y-0.5 border-l border-[var(--border)] pl-2">
                          {category.endpoints.map((e) => (
                            <li key={e.id}>
                              <Link
                                to={endpointPath(project, e)}
                                onClick={onNavigate}
                                title={`${e.method} ${e.path}`}
                                className="flex h-7 items-center gap-2 px-1.5 text-xs text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
                              >
                                <MethodTag method={e.method} />
                                <span className="truncate">{e.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarTree;
