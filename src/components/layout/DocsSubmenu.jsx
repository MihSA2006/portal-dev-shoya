import { NavLink } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { getProjectSlug } from '../../utils/documentation';

/**
 * Sous-menu Documentation : un lien par projet (dynamique).
 */
const DocsSubmenu = ({ onNavigate }) => {
  const { projects } = useProjects();
  if (projects.length === 0) return null;

  return (
    <ul
      aria-label="Documentation par projet"
      className="mt-1 ml-6 space-y-1 border-l border-[var(--border-strong)] pl-2"
    >
      {projects.map((p) => (
        <li key={p.id}>
          <NavLink
            to={`/documentation/${getProjectSlug(p)}`}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-9 items-center px-3 text-[13px] transition-colors ${
                isActive
                  ? 'bg-[var(--accent-tint)] text-[var(--accent)] font-medium'
                  : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
              }`
            }
          >
            <span className="truncate">{p.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DocsSubmenu;
