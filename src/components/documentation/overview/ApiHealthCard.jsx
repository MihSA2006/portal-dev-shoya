import { Activity, ChevronRight } from 'lucide-react';
import { HEALTH_STATUS } from '../../../constants/overview';
import { ENVIRONMENTS } from '../../../constants/projects';
import { envHealth } from '../../../utils/overview';
import OverviewCard from './OverviewCard';

/** Un clic sur un environnement le sélectionne (URL de base et exemple cURL). */
const ApiHealthCard = ({ project, overview, env, onEnv }) => (
  <OverviewCard icon={Activity} title="Santé de l'API" subtitle="État du système selon l'environnement.">
    <ul>
      {ENVIRONMENTS.map(({ key, label }) => {
        const { status, latency } = envHealth(project, overview, key);
        const { label: statusLabel, tone } = HEALTH_STATUS[status];
        return (
          <li key={key} className="border-t border-[var(--border)] first:border-0">
            <button
              type="button"
              onClick={() => onEnv(key)}
              disabled={!project.environments[key]}
              aria-pressed={key === env}
              className={`flex w-full items-center gap-4 px-1 py-3.5 text-left transition-colors hover:bg-[var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent ${
                key === env ? 'bg-[var(--surface-2)]' : ''
              }`}
            >
              <span data-tone={tone} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--tone)_16%,transparent)]">
                <span className="h-3.5 w-3.5 rounded-full bg-[var(--tone)] shadow-[0_0_10px_var(--tone)]" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-[var(--text)]">{label}</span>
                <span data-tone={tone} className="text-xs text-[var(--tone)]">{statusLabel}</span>
              </span>
              <span className="text-xs text-[var(--text-muted)]">{latency ?? '—'}</span>
              <ChevronRight size={16} className="shrink-0 text-[var(--text-muted)]" />
            </button>
          </li>
        );
      })}
    </ul>
  </OverviewCard>
);

export default ApiHealthCard;
