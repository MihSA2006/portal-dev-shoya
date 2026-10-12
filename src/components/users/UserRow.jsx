import { Pencil, MoreVertical, Eye, Ban, ShieldCheck, ShieldOff, Monitor } from 'lucide-react';
import Popover from '../ui/Popover';
import RoleBadge from './RoleBadge';

const MenuItem = ({ icon: Icon, onClick, danger, children }) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface-2)] ${
        danger ? 'text-[var(--danger)]' : 'text-[var(--text-soft)] hover:text-[var(--accent)]'
      }`}
    >
      <Icon size={16} strokeWidth={1.75} /> {children}
    </button>
  </li>
);

export default function UserRow({ user, selected, panelOpen, dropUp, onToggle, onView, onEdit, onDisable }) {
  const active = user.status === 'active';
  const hideWhenPanel = panelOpen ? 'hidden 2xl:table-cell' : '';

  return (
    <tr
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`cursor-pointer border-b border-[var(--border)] transition-colors last:border-0 ${
        selected ? 'bg-[var(--accent-tint)] shadow-[inset_3px_0_0_var(--accent)]' : 'hover:bg-[var(--surface-2)]'
      }`}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt=""
            className="h-10 w-10 shrink-0 border-radius-full border-[var(--border-strong)] object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text)]">{user.name}</p>
            <p className="truncate text-xs text-[var(--text-muted)]">@{user.username}</p>
            {user.githubUsername && (
              <a
                href={`https://github.com/${encodeURIComponent(user.githubUsername)}`}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="truncate text-xs text-[var(--accent)] hover:underline"
              >
                github.com/{user.githubUsername}
              </a>
            )}
          </div>
        </div>
      </td>

      <td className={`px-4 py-3 text-sm text-[var(--text-soft)] ${hideWhenPanel}`}>{user.email}</td>

      <td className="px-4 py-3"><RoleBadge role={user.role} /></td>

      <td className={`px-4 py-3 text-sm text-[var(--text-soft)] ${hideWhenPanel}`}>{user.projects}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className={`grid h-7 w-7 place-items-center border ${
              user.twoFactor
                ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
                : 'border-[var(--border-strong)] text-[var(--text-muted)]'
            }`}
          >
            {user.twoFactor ? <ShieldCheck size={15} /> : <ShieldOff size={15} />}
          </span>
          <span className="text-[11px] leading-tight">
            <span className="block font-medium text-[var(--text-soft)]">TOTP</span>
            <span className={`block ${user.twoFactor ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
              {user.twoFactor ? 'Activée' : 'Désactivée'}
            </span>
          </span>
        </div>
      </td>

      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium ${
            active
              ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
              : 'border-[var(--border-strong)] text-[var(--text-muted)]'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-[var(--accent)]' : 'bg-[var(--text-muted)]'}`} />
          {active ? 'Actif' : 'Inactif'}
        </span>
      </td>

      <td className="px-4 py-3">
        <p className="text-sm text-[var(--text-soft)]">{user.lastActivity}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
          <Monitor size={12} /> {user.device}
        </p>
      </td>

      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Modifier le compte de ${user.name}`}
            title="Modifier le compte"
            className="grid h-9 w-9 place-items-center border border-[var(--border-strong)] text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Pencil size={16} />
          </button>

          <Popover
            width="w-56"
            placement={dropUp ? 'top' : 'bottom'}
            trigger={({ open, toggle }) => (
              <button type="button" onClick={toggle} aria-expanded={open} aria-label={`Plus d'actions pour ${user.name}`} className="icon-btn">
                <MoreVertical size={18} />
              </button>
            )}
          >
            {({ close }) => (
              <ul className="py-1">
                <MenuItem icon={Eye} onClick={() => { close(); onView(); }}>Voir le détail</MenuItem>
                <MenuItem icon={Pencil} onClick={() => { close(); onEdit(); }}>Modifier le compte</MenuItem>
                {active && (
                  <MenuItem icon={Ban} danger onClick={() => { close(); onDisable(); }}>Désactiver le compte</MenuItem>
                )}
              </ul>
            )}
          </Popover>
        </div>
      </td>
    </tr>
  );
}
