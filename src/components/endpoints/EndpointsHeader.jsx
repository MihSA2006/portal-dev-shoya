import { Plus } from 'lucide-react';
import GithubIcon from '../ui/GithubIcon';

const EndpointsHeader = ({ online, onCreate, canCreate }) => (
  <header className="flex flex-wrap items-start justify-between gap-4">
    <div>
      <h1 className="font-display text-3xl font-semibold">Tous les endpoints</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Vue unifiée de tous les endpoints API de vos projets.</p>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <span
        data-tone={online ? 'accent' : 'admin'}
        className="flex h-11 items-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-xs text-[var(--text-soft)]"
        role="status"
      >
        <GithubIcon size={16} />
        <span className="h-2 w-2 rounded-full bg-[var(--tone)] shadow-[0_0_8px_var(--tone)]" />
        {online ? 'Synchro GitHub en direct' : 'GitHub non connecté'}
      </span>
      <button type="button" onClick={onCreate} disabled={!canCreate} className="btn btn-primary">
        <Plus size={17} /> Créer un endpoint
      </button>
    </div>
  </header>
);

export default EndpointsHeader;
