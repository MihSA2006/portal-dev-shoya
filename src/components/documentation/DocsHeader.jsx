import { Code2 } from 'lucide-react';
import DocsSearch from './DocsSearch';
import EcosystemCard from './EcosystemCard';

const DocsHeader = ({ stats, query, onQuery }) => (
  <header className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_auto] items-center">
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <Code2 size={36} className="shrink-0 text-[var(--accent)]" />
        <div>
          <h1 className="font-display text-3xl font-semibold">Documentation API</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Consultez et gérez les API maintenues par Shoya Labs.</p>
        </div>
      </div>
      <DocsSearch value={query} onChange={onQuery} />
    </div>
    <div className="flex flex-wrap items-start gap-4">
      <EcosystemCard stats={stats} />
    </div>
  </header>
);

export default DocsHeader;
