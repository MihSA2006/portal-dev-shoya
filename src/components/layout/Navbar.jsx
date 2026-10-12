import { useEffect, useRef, useState } from 'react';
import {
  Search, Bell, Sun, Moon, ChevronDown, Menu,
  User, Settings, LifeBuoy, LogOut, CheckCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import Popover from '../ui/Popover';
import useTheme from '../../hooks/useTheme';

// Replace with real user data.
const USER = { name: 'Fanomezantsoa Mickael', role: 'Développeur', initials: 'FM' };

const INITIAL_NOTIFS = [
  { id: 1, title: "Nouvelle version de l'API", text: 'La v2.8.0 est disponible dans la documentation.', time: 'Il y a 5 min', unread: true },
  { id: 2, title: 'Tâche assignée', text: "Revue du module d'authentification.", time: 'Il y a 1 h', unread: true },
  { id: 3, title: 'Absence validée', text: 'Votre demande a été approuvée.', time: 'Hier', unread: false },
];

const PROFILE_LINKS = [
  { label: 'Mon profil', icon: User, to: '/settings' },
  { label: 'Paramètres', icon: Settings, to: '/settings' },
  { label: 'Aide & support', icon: LifeBuoy, to: '/documentation' },
];

export default function Navbar({ onMenuClick }) {
  const { theme, toggle } = useTheme();
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const searchRef = useRef(null);
  const unreadCount = notifs.filter((n) => n.unread).length;

  // Ctrl/Cmd + K shortcut.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const markRead = (id) => setNotifs((l) => l.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const markAllRead = () => setNotifs((l) => l.map((n) => ({ ...n, unread: false })));

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center bg-[var(--surface)] border-b border-[var(--border)]">
      <span className="navbar-line" />

      {/* Logo */}
      <div className="flex shrink-0 items-center gap-1 pl-2 pr-3 md:w-64 md:pl-5">
        <button className="icon-btn md:hidden" onClick={onMenuClick} aria-label="Ouvrir le menu">
          <Menu size={22} />
        </button>
        <Logo />
      </div>

      {/* Recherche */}
      <div className="flex-1 px-2 md:px-4">
        <label className="cut-frame cut-sm hidden h-10 max-w-2xl items-center gap-3 px-3.5 sm:flex">
          <Search size={18} className="text-[var(--accent)]" />
          <input
            ref={searchRef}
            type="search"
            placeholder="Rechercher documentation, endpoints, projets..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]"
          />
          <kbd className="hidden border-radius-full border-[var(--border-strong)] px-1.5 py-0.5 text-[11px] text-[var(--text-muted)] lg:block">
            Ctrl + K
          </kbd>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 pr-2 sm:gap-2 sm:pr-5">
        <button className="icon-btn sm:hidden" onClick={() => searchRef.current?.focus()} aria-label="Rechercher">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <Popover
          width="w-96"
          trigger={({ open, toggle: t }) => (
            <button className="icon-btn" onClick={t} aria-expanded={open} aria-label="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && <span className="unread-dot absolute right-2 top-2 rounded-full" />}
            </button>
          )}
        >
          {() => (
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
                <div>
                  <p className="font-display text-sm font-semibold text-[var(--text)]">Notifications</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {unreadCount > 0 ? `${unreadCount} non lue${unreadCount > 1 ? 's' : ''}` : 'Tout est lu'}
                  </p>
                </div>
                <button
                  onClick={markAllRead}
                  disabled={unreadCount === 0}
                  className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline disabled:opacity-40 disabled:no-underline"
                >
                  <CheckCheck size={14} /> Tout marquer comme lu
                </button>
              </div>

              <ul className="max-h-80 overflow-y-auto">
                {notifs.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => markRead(n.id)}
                      className="flex w-full gap-3 px-4 py-3 text-left hover:bg-[var(--surface-2)] transition-colors"
                    >
                      <span className="mt-1.5 w-2 shrink-0">
                        {n.unread && <span className="unread-dot block rounded-full" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm ${n.unread ? 'font-semibold text-[var(--text)]' : 'text-[var(--text-soft)]'}`}>
                          {n.title}
                        </span>
                        <span className="block text-xs text-[var(--text-muted)]">{n.text}</span>
                        <span className="mt-1 block text-[11px] text-[var(--text-muted)]">{n.time}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-[var(--border)] px-4 py-2.5 text-center">
                <Link to="/" className="text-xs text-[var(--accent)] hover:underline">Voir toutes les notifications</Link>
              </div>
            </div>
          )}
        </Popover>

        {/* Light/dark theme. */}
        <button
          className="icon-btn"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
          title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <span className="mx-1 hidden h-6 w-px bg-[var(--border-strong)] sm:block" />

        {/* Profil */}
        <Popover
          width="w-64"
          trigger={({ open, toggle: t }) => (
            <button onClick={t} aria-expanded={open} className="flex items-center gap-3 px-1.5 py-1 hover:bg-[var(--surface-2)] transition-colors">
              <span className="grid h-10 w-10 place-items-center border border-[var(--accent)] bg-[var(--accent-tint)] font-display text-sm font-semibold text-[var(--accent)]">
                {USER.initials}
              </span>
              <span className="hidden text-left leading-tight lg:block">
                <span className="block text-sm font-medium text-[var(--text)]">{USER.name}</span>
                <span className="block text-xs text-[var(--text-muted)]">{USER.role}</span>
              </span>
              <ChevronDown size={16} className={`hidden text-[var(--text-muted)] transition-transform lg:block ${open ? 'rotate-180' : ''}`} />
            </button>
          )}
        >
          {({ close }) => (
            <div>
              <div className="px-4 py-3 border-b border-[var(--border)]">
                <p className="text-sm font-semibold text-[var(--text)]">{USER.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{USER.role}</p>
              </div>
              <ul className="py-1">
                {PROFILE_LINKS.map(({ label, icon: Icon, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      onClick={close}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] transition-colors"
                    >
                      <Icon size={17} strokeWidth={1.75} /> {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-[var(--border)] py-1">
                <button
                  onClick={() => { close(); /* TODO: implement sign-out. */ }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--accent)] transition-colors"
                >
                  <LogOut size={17} strokeWidth={1.75} /> Se déconnecter
                </button>
              </div>
            </div>
          )}
        </Popover>
      </div>
    </header>
  );
}
