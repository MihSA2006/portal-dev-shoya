import { MoreHorizontal, Eye, Copy } from 'lucide-react';
import Popover from '../ui/Popover';
import ResultBadge from './ResultBadge';
import { ACTIONS, RESULTS, formatTimestamp } from '../../constants/audit';

const MenuItem = ({ icon: Icon, onClick, children }) => (
  <li>
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--accent)]"
    >
      <Icon size={16} strokeWidth={1.75} /> {children}
    </button>
  </li>
);

const copy = (text) => { try { navigator.clipboard.writeText(text); } catch { /* ignore */ } };

export default function AuditRow({ event, dropUp, onDetail }) {
  const action = ACTIONS[event.actionKey];
  const Icon = action.icon;
  const tone = RESULTS[event.result].tone;

  return (
    <tr className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--surface-2)]">
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <span data-tone={tone} className="text-[var(--tone)]"><Icon size={22} /></span>
          <span className="whitespace-nowrap text-sm tabular-nums text-[var(--text-soft)]">{formatTimestamp(event.time)}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-[var(--text)]">{event.userName}</p>
        <p className="text-xs text-[var(--text-muted)]">{event.userRole}</p>
      </td>
      <td className="px-4 py-3 text-sm text-[var(--text)]">{action.label}</td>
      <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{event.resource}</td>
      <td className="px-4 py-3 text-sm text-[var(--text-soft)]">{event.project}</td>
      <td className="px-4 py-3 text-sm tabular-nums text-[var(--text-soft)]">{event.ip}</td>
      <td className="px-4 py-3"><ResultBadge result={event.result} /></td>
      <td className="px-2 py-3">
        <div className="flex justify-end">
          <Popover
            width="w-56"
            placement={dropUp ? 'top' : 'bottom'}
            trigger={({ open, toggle }) => (
              <button type="button" onClick={toggle} aria-expanded={open} aria-label="Actions de l'événement" className="icon-btn">
                <MoreHorizontal size={18} />
              </button>
            )}
          >
            {({ close }) => (
              <ul className="py-1">
                <MenuItem icon={Eye} onClick={() => { close(); onDetail(event); }}>Voir le détail</MenuItem>
                <MenuItem icon={Copy} onClick={() => { close(); copy(event.ip); }}>Copier l'adresse IP</MenuItem>
                <MenuItem icon={Copy} onClick={() => { close(); copy(event.resource); }}>Copier la ressource</MenuItem>
              </ul>
            )}
          </Popover>
        </div>
      </td>
    </tr>
  );
}
