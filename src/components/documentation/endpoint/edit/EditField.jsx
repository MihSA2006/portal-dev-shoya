export const inputCls = (error, height = 'h-11') =>
  `w-full border bg-[var(--bg-elevated)] px-3.5 text-sm text-[var(--text)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${height} ${
    error ? 'border-[var(--danger)]' : 'border-[var(--border-strong)]'
  }`;

export default function EditField({ label, htmlFor, error, required, hint, aside, className = '', children }) {
  return (
    <div className={className}>
      {(label || aside) && (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--text-soft)]">
            {label}
            {required && <span className="text-[var(--danger)]"> *</span>}
          </label>
          {aside}
        </div>
      )}
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-[var(--danger)]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 truncate text-xs text-[var(--text-muted)]">{hint}</p>
      ) : null}
    </div>
  );
}
