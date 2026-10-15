export default function EditSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 border transition-colors ${
        checked ? 'border-[var(--accent)] bg-[var(--accent-tint)]' : 'border-[var(--border-strong)] bg-[var(--surface-2)]'
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 transition-all ${
          checked ? 'left-[1.375rem] bg-[var(--accent)]' : 'left-0.5 bg-[var(--text-muted)]'
        }`}
      />
    </button>
  );
}
