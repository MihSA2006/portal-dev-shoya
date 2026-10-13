import { Info } from 'lucide-react';
import CodeBlock from '../../ui/CodeBlock';
import OverviewCard from '../overview/OverviewCard';

const ResponseCard = ({ response, notes }) => (
  <OverviewCard
    title="Réponse"
    action={
      <span className="border border-[var(--border-strong)] bg-[var(--surface-2)] px-2.5 py-1 text-xs text-[var(--text-soft)]">
        {response.status} · application/json
      </span>
    }
  >
    {response.example ? (
      <CodeBlock code={JSON.stringify(response.example, null, 2)} />
    ) : (
      <p className="border border-dashed border-[var(--border-strong)] py-8 text-center text-sm text-[var(--text-muted)]">
        {response.status === 204 ? 'Aucun contenu retourné (204).' : 'Exemple de réponse non documenté.'}
      </p>
    )}

    {notes.length > 0 && (
      <div className="mt-4">
        <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
          <Info size={16} /> Notes
        </h3>
        <ul className="list-disc space-y-1 pl-9 text-xs text-[var(--text-soft)]">
          {notes.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    )}
  </OverviewCard>
);

export default ResponseCard;
