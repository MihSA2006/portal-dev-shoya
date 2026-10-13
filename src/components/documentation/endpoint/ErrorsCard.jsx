import { AlertTriangle } from 'lucide-react';
import OverviewCard from '../overview/OverviewCard';

const ErrorsCard = ({ errors }) => (
  <OverviewCard icon={AlertTriangle} title="Erreurs">
    <ul className="space-y-3">
      {errors.map((e) => (
        <li key={e.code} className="flex items-center gap-4">
          <span data-tone="danger" className="tone-badge w-14 shrink-0 py-1 text-center text-sm font-semibold">{e.code}</span>
          <span className="min-w-0">
            <span className="block text-sm font-medium text-[var(--text)]">{e.title}</span>
            <span className="block text-xs text-[var(--text-muted)]">{e.description}</span>
          </span>
        </li>
      ))}
    </ul>
  </OverviewCard>
);

export default ErrorsCard;
