/** Interrupteur avec libellé Actif / Inactif (libellé masquable). */
export default function AlertSwitch({ checked, onChange, label, showLabel = true }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`inline-flex h-9 shrink-0 items-center gap-3 text-xs font-semibold transition-colors ${
        showLabel ? 'px-3' : 'px-2'
      } ${
        checked
          ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
          : 'border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--text-muted)]'
      }`}
    >
      {showLabel && <span className="w-12 text-left">{checked ? 'Actif' : 'Inactif'}</span>}
      <span className={`relative h-5 w-10 border ${checked ? 'border-[var(--accent)]' : 'border-[var(--border-strong)]'}`}>
        <span
          className={`absolute top-0.5 h-3 w-3 transition-all ${
            checked ? 'left-[1.375rem] bg-[var(--accent)]' : 'left-0.5 bg-[var(--text-muted)]'
          }`}
        />
      </span>
    </button>
  );
}
