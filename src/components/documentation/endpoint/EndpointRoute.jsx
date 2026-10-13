import { Globe, Lock } from 'lucide-react';
import CopyButton from '../../ui/CopyButton';

/** Méthode + chemin, puis URL complète de l'environnement choisi. */
const EndpointRoute = ({ method, path, url }) => (
  <div className="w-full max-w-xl divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--bg-elevated)]">
    <div className="flex items-center gap-3 px-3 py-2.5 text-sm">
      <Lock size={17} className="shrink-0 text-[var(--text-soft)]" />
      <span className="text-[var(--text-soft)]">{method}</span>
      <span className="truncate font-medium text-[var(--cyan)]">{path}</span>
    </div>
    <div className="flex items-center gap-3 px-3 py-2 text-sm border-none">
      <Globe size={17} className="shrink-0 text-[var(--text-soft)]" />
      <span className="min-w-0 flex-1 truncate text-[var(--text)]">{url || 'URL non configurée'}</span>
      {url && <CopyButton value={url} label="Copier l'URL" />}
    </div>
  </div>
);

export default EndpointRoute;
