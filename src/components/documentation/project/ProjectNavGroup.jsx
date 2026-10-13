import { NavLink } from 'react-router-dom';
import { getEndpointSlug } from '../../../utils/documentation';
import { ArrowLeftRight, CreditCard, History, Key, Server, Settings2, User, Wallet, Webhook, ChevronDown, ChevronUp, Box } from 'lucide-react';

const ICONS = {
  wallet: Wallet,
  card: CreditCard,
  user: User,
  transfer: ArrowLeftRight,
  history: History,
  webhook: Webhook,
  key: Key,
  server: Server,
  settings: Settings2,
};

/** Catégorie repliable contenant ses endpoints. */
const ProjectNavGroup = ({ projectSlug, category, open, active, onToggle, onNavigate }) => {
  const Icon = ICONS[category.icon] ?? Box;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`relative flex h-11 w-full items-center gap-3 px-3.5 text-sm font-medium transition-colors ${
          active ? 'bg-[var(--surface-2)] text-[var(--accent)]' : 'text-[var(--text-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
        }`}
      >
        {active && <span className="absolute inset-y-2 left-0 w-0.5 bg-[var(--accent)]" />}
        <Icon size={19} strokeWidth={1.75} className="shrink-0" />
        <span className="flex-1 truncate text-left">{category.name}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <ul className="animate-enter ml-6 mt-1 space-y-1 border-l border-[var(--border-strong)] pl-2">
          {category.endpoints.map((e) => (
            <li key={e.id}>
              <NavLink
                to={`/documentation/${projectSlug}/endpoints/${getEndpointSlug(e)}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex h-9 items-center gap-2.5 px-3 text-[13px] transition-colors ${
                    isActive
                      ? 'bg-[var(--accent-tint)] font-medium text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />}
                    <span className="truncate">{e.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectNavGroup;
