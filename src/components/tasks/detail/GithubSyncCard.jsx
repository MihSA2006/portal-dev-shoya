import { RefreshCw } from 'lucide-react';
import GithubIcon from '../../ui/GithubIcon';
import { timeAgo } from '../../../utils/tasks';

const GithubSyncCard = ({ github }) => (
  <aside
    className="cut-frame flex items-center gap-4 p-5 [--frame-bg:linear-gradient(135deg,color-mix(in_srgb,var(--accent)_14%,var(--surface)),var(--surface)_70%)]"
    aria-live="polite"
  >
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
      <RefreshCw size={22} />
    </span>
    <div className="min-w-0 flex-1 text-sm">
      {github ? (
        <>
          <p className="font-medium">
            Synchronisé automatiquement depuis GitHub
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[var(--accent)] align-middle" />
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Dernière synchro : {timeAgo(github.syncedAt)}</p>
        </>
      ) : (
        <>
          <p className="font-medium">En attente de synchronisation</p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">Aucune activité GitHub reçue pour cette tâche.</p>
        </>
      )}
    </div>
    <GithubIcon className="h-9 w-9 shrink-0 text-[var(--text)]" />
  </aside>
);

export default GithubSyncCard;
