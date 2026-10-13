import { Link } from 'react-router-dom';
import { Activity, ChevronRight } from 'lucide-react';
import DashCard from './DashCard';

export default function RecentActivityCard({ items, scope }) {
  return (
    <DashCard
      title="Activité récente"
      icon={Activity}
      scope={scope}
      aside={
        <Link to="/administration/audit-log" className="text-xs text-[var(--accent)] hover:underline">
          Tout voir
        </Link>
      }
    >
      {items.length === 0 ? (
        <p className="py-8 text-center text-sm text-[var(--text-muted)]">Aucune activité récente pour ce projet.</p>
      ) : (
        <ul className="-mx-2 divide-y divide-[var(--border)]">
          {items.map(({ id, icon: Icon, tone, title, subtitle, time, to }) => (
            <li key={id}>
              <Link
                to={to}
                className="group flex items-center gap-3 px-2 py-3 transition-colors hover:bg-[var(--surface-2)]"
              >
                <span data-tone={tone} className="tone-badge grid h-10 w-10 shrink-0 place-items-center">
                  <Icon size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--text)]">{title}</p>
                  <p className="truncate text-xs text-[var(--text-muted)]">{subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-[var(--text-muted)]">{time}</span>
                <ChevronRight
                  size={16}
                  className="shrink-0 text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DashCard>
  );
}