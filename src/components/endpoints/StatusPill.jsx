/** Pastille d'état (cycle de vie, documentation) colorée par ton. */
const StatusPill = ({ tone, label }) => (
  <span data-tone={tone} className="tone-badge inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs font-medium">
    <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone)]" />
    {label}
  </span>
);

export default StatusPill;
