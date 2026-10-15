import { Gauge, Check, X } from 'lucide-react';
import EditCard from './EditCard';
import { getCompleteness } from '../../../../utils/endpointDraft';

export default function CompletenessCard({ draft }) {
  const { score, checks } = getCompleteness(draft);
  const missing = checks.filter((c) => !c.ok);
  const tone = score >= 80 ? 'accent' : score >= 50 ? 'admin' : 'danger';

  return (
    <EditCard title="Complétude de l'endpoint" icon={Gauge}>
      <div data-tone={tone} className="flex items-center gap-4">
        <p className="font-display text-3xl font-semibold text-[var(--tone)]">{score} %</p>
        <div className="h-2 flex-1 bg-[var(--surface-2)]">
          <div
            className="h-full bg-[var(--tone)] transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
        {checks.map((c) => (
          <li key={c.id} className="flex items-center gap-2.5 text-sm text-[var(--text-soft)]">
            <span
              data-tone={c.ok ? 'accent' : 'danger'}
              className="tone-badge grid h-5 w-5 shrink-0 place-items-center"
            >
              {c.ok ? <Check size={12} /> : <X size={12} />}
            </span>
            {c.label}
          </li>
        ))}
      </ul>

      {missing.length > 0 && (
        <p className="mt-4 text-xs text-[var(--text-muted)]">
          Champs manquants : {missing.map((m) => m.label).join(', ')}.
        </p>
      )}
    </EditCard>
  );
}
