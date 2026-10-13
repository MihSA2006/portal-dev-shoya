/**
 * Groupe de filtres rapides (un seul actif).
 * options : [{ value, label, count? }]
 */
export default function FilterChips({ options, value, onChange, ariaLabel }) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`inline-flex h-8 items-center gap-2 border px-3 text-xs font-medium transition-colors ${
              active
                ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
            }`}
          >
            {o.label}
            {o.count != null && <span className="tabular-nums opacity-70">{o.count}</span>}
          </button>
        );
      })}
    </div>
  );
}