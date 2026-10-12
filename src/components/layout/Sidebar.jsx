import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { PAGES } from '../../constants/routes';

const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const groupIsActive = (p) => pathname === p.path || pathname.startsWith(`${p.path}/`);

  const [openGroups, setOpenGroups] = useState(() =>
    PAGES.filter((p) => p.children && groupIsActive(p)).map((p) => p.path)
  );

  // Open a group automatically when navigating inside it
  useEffect(() => {
    PAGES.forEach((p) => {
      if (p.children && groupIsActive(p)) {
        setOpenGroups((g) => (g.includes(p.path) ? g : [...g, p.path]));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleGroup = (item) => {
    const { path, children } = item;
    // In the collapsed rail, clicking a group expands the sidebar and opens it
    if (collapsed && isDesktop()) {
      onToggleCollapse();
      setOpenGroups((g) => (g.includes(path) ? g : [...g, path]));
      if (!groupIsActive(item)) navigate(children[0].path);
      return;
    }
    if (!groupIsActive(item)) {
      setOpenGroups((g) => (g.includes(path) ? g : [...g, path]));
      navigate(children[0].path);
      return;
    }
    setOpenGroups((g) => (g.includes(path) ? g.filter((x) => x !== path) : [...g, path]));
  };

  // Hides labels on desktop when collapsed (the mobile drawer is always full width)
  const hide = collapsed ? 'md:hidden' : '';
  const rowBase = `relative flex items-center gap-3 h-11 px-3.5 text-sm font-medium transition-colors ${
    collapsed ? 'md:justify-center md:px-0' : ''
  }`;
  const idle = 'text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]';

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 pt-16 transition-[transform,width] duration-200
          md:sticky md:top-16 md:z-10 md:h-[calc(100vh-4rem)] md:shrink-0 md:translate-x-0 md:pt-0
          ${collapsed ? 'md:w-[92px]' : 'md:w-64'}
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full p-3 md:p-4 md:pr-2">
          <div className="cut-frame h-full flex flex-col">
            <nav className="sidebar-glow flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden p-3" aria-label="Navigation principale">
              {PAGES.map((item) => {
                const { path, name, icon: Icon, badge, children } = item;

                /* ───── Group with sub-menu ───── */
                if (children) {
                  const isOpen = openGroups.includes(path);
                  const active = groupIsActive(item);
                  return (
                    <div key={path}>
                      <button
                        type="button"
                        onClick={() => toggleGroup(item)}
                        aria-expanded={isOpen}
                        title={collapsed ? name : undefined}
                        className={`${rowBase} w-full ${
                          active ? 'bg-[var(--surface-2)] text-[var(--accent)]' : idle
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.75} className="shrink-0" />
                        <span className={`flex-1 truncate text-left ${hide}`}>{name}</span>
                        <span className={hide}>
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </span>
                      </button>

                      {isOpen && (
                        <ul className={`animate-enter mt-1 ml-6 space-y-1 border-l border-[var(--border-strong)] pl-2 ${hide}`}>
                          {children.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                  `flex h-9 items-center px-3 text-[13px] transition-colors ${
                                    isActive
                                      ? 'bg-[var(--accent-tint)] text-[var(--accent)] font-medium'
                                      : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                                  }`
                                }
                              >
                                <span className="truncate">{child.name}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }

                /* ───── Simple link ───── */
                return (
                  <NavLink
                    key={path}
                    to={path}
                    end={path === '/'}
                    onClick={onClose}
                    title={collapsed ? name : undefined}
                    className={({ isActive }) =>
                      `${rowBase} ${
                        isActive
                          ? 'cut-frame cut-sm [--frame-border:var(--accent)] [--frame-bg:var(--accent-tint)] text-[var(--accent)]'
                          : idle
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon size={19} strokeWidth={1.75} className="shrink-0" />
                        <span className={`flex-1 truncate ${hide}`}>{name}</span>
                        {badge > 0 && (
                          <>
                            <span className={`grid h-5 min-w-5 place-items-center border border-[var(--cyan)] bg-[var(--cyan-soft)] px-1 text-[11px] font-semibold text-[var(--cyan)] ${hide}`}>
                              {badge}
                            </span>
                            {collapsed && (
                              <span className="unread-dot absolute right-2 top-2 hidden rounded-full md:block" />
                            )}
                          </>
                        )}
                        {isActive && <ChevronRight size={16} className={hide} />}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Footer + collapse button */}
            <div
              className={`flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-xs ${
                collapsed ? 'md:flex-col md:gap-2 md:px-0 md:py-3 md:justify-center' : ''
              }`}
            >
              <div className={`leading-5 ${collapsed ? 'md:text-center' : ''}`}>
                <p className={`font-display text-sm text-[var(--text-soft)] ${hide}`}>ShoyaDev</p>
                <p className="font-semibold text-[var(--accent)]">v2.8.0</p>
                <p className={`text-[var(--text-muted)] ${hide}`}>Édition Entreprise</p>
              </div>
              <button
                type="button"
                onClick={onToggleCollapse}
                className="icon-btn hidden md:grid"
                aria-label={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
                title={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
              >
                {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
