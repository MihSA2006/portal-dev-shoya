const Toggle = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <div className="min-w-0">
      <p className="text-sm font-medium text-[var(--text)]">{label}</p>
      {description && <p className="mt-0.5 text-xs text-[var(--text-muted)]">{description}</p>}
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 border transition-colors ${checked ? 'border-[var(--accent)] bg-[var(--accent-tint)]' : 'border-[var(--border-strong)] bg-[var(--surface-2)]'}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 transition-all ${checked ? 'left-6 bg-[var(--accent)]' : 'left-0.5 bg-[var(--text-muted)]'}`} />
    </button>
  </div>
);

export default Toggle;
