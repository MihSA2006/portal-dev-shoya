import { RESULTS } from '../../constants/audit';

export default function ResultBadge({ result }) {
  const r = RESULTS[result];
  if (!r) return null;
  const Icon = r.icon;
  return (
    <span
      data-tone={r.tone}
      className="tone-badge inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
    >
      <Icon size={13} /> {r.label}
    </span>
  );
}
