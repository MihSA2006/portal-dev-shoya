import { History } from 'lucide-react';
import { formatAgo } from '../../../utils/time';
import OverviewCard from './OverviewCard';

const LatestChangesCard = ({ changes }) => (
  <OverviewCard icon={History} title="Derniers changements" subtitle="Mises à jour récentes de l'API.">
    {changes.length === 0 ? (
      <p className="py-8 text-center text-sm text-[var(--text-muted)]">Aucun changement récent.</p>
    ) : (
      <ul>
        {changes.map((change) => (
          <li key={change.id} data-tone={change.tone} className="flex items-center gap-3 border-t border-[var(--border)] py-4 first:border-0 first:pt-0">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--tone)]" />
            <span className="min-w-0 flex-1 text-sm text-[var(--text)]">{change.text}</span>
            <span className="shrink-0 text-xs text-[var(--text-muted)]">{formatAgo(change.minutes)}</span>
          </li>
        ))}
      </ul>
    )}
  </OverviewCard>
);

export default LatestChangesCard;
