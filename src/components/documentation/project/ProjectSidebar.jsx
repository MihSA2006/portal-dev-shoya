import { useEffect, useState } from 'react';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { BookOpen, ChevronDown, Home, PanelLeftOpen } from 'lucide-react';
import ProjectBrand from './ProjectBrand';
import ProjectNavGroup from './ProjectNavGroup';
import ProjectPromo from './ProjectPromo';
import { getEndpointSlug, getProjectSlug } from '../../../utils/documentation';

const ENDPOINT_PATH = '/documentation/:projectSlug/endpoints/:endpointSlug';

/**
 * Sidebar d'un projet : Overview, puis une catégorie repliable par groupe d'endpoints.
 * Utiliser key={project.id} pour réinitialiser l'état à chaque changement de projet.
 */
const ProjectSidebar = ({ project, categories, guides = [] }) => {
  const { pathname } = useLocation();
  const projectSlug = getProjectSlug(project);
  const base = `/documentation/${projectSlug}`;

  const activeEndpointSlug = matchPath(ENDPOINT_PATH, pathname)?.params.endpointSlug;
  const activeCategoryId = categories.find((c) =>
    c.endpoints.some((endpoint) => getEndpointSlug(endpoint) === activeEndpointSlug)
  )?.id;

  const [openIds, setOpenIds] = useState(() => (activeCategoryId ? [activeCategoryId] : []));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Ouvre automatiquement la catégorie de l'endpoint affiché.
  useEffect(() => {
    if (activeCategoryId) setOpenIds((ids) => (ids.includes(activeCategoryId) ? ids : [...ids, activeCategoryId]));
  }, [activeCategoryId]);

  const toggle = (id) => setOpenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:self-start">
      {/* Bouton d'ouverture sur mobile */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        aria-expanded={mobileOpen}
        className="btn btn-outline mb-3 w-full justify-between lg:hidden"
      >
        <span className="flex items-center gap-2"><PanelLeftOpen size={17} /> Menu de {project.name}</span>
        <ChevronDown size={16} className={mobileOpen ? 'rotate-180' : ''} />
      </button>

      <div className={`floating ${mobileOpen ? 'block' : 'hidden'} lg:block lg:h-full`}>
        <aside className="cut-frame flex h-[calc(100vh-8rem)] max-h-[calc(100vh-8rem)] min-h-0 flex-col lg:h-full lg:max-h-full" aria-label={`Documentation de ${project.name}`}>
          <ProjectBrand project={project} />

          <nav className="sidebar-glow min-h-0 flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden p-3">
            <NavLink
              to={base}
              end
              onClick={closeMobile}
              className={({ isActive }) =>
                `flex h-11 items-center gap-3 px-3.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'cut-frame cut-sm [--frame-border:var(--accent)] [--frame-bg:var(--accent-tint)] text-[var(--accent)]'
                    : 'text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`
              }
            >
              <Home size={19} strokeWidth={1.75} className="shrink-0" /> Vue d'ensemble
            </NavLink>

            {guides.length > 0 && (
              <div className="space-y-1">
                <p className="px-3.5 pt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Guides</p>
                {guides.map((guide) => (
                  <NavLink
                    key={guide.id}
                    to={`${base}/guides/${guide.id}`}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `flex h-10 items-center gap-3 px-3.5 text-[13px] transition-colors ${
                        isActive
                          ? 'bg-[var(--accent-tint)] font-medium text-[var(--accent)]'
                          : 'text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                      }`
                    }
                  >
                    <BookOpen size={17} strokeWidth={1.75} className="shrink-0" />
                    <span className="truncate">{guide.title}</span>
                  </NavLink>
                ))}
              </div>
            )}

            {categories.map((category) => (
              <ProjectNavGroup
                key={category.id}
                projectSlug={projectSlug}
                category={category}
                open={openIds.includes(category.id)}
                active={category.id === activeCategoryId}
                onToggle={() => toggle(category.id)}
                onNavigate={closeMobile}
              />
            ))}

            {categories.length === 0 && (
              <p className="px-3.5 py-3 text-xs text-[var(--text-muted)]">Aucun endpoint documenté pour ce projet.</p>
            )}
          </nav>

          <ProjectPromo project={project} />
        </aside>
      </div>
    </div>
  );
};

export default ProjectSidebar;
