/** Bouton carré d'action sur une ligne (supprimer, dupliquer). */
export default function RowButton({ label, tone = 'danger', onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-11 w-11 shrink-0 place-items-center border border-[var(--border-strong)] text-[var(--text-soft)] transition-colors ${
        tone === 'danger'
          ? 'hover:border-[var(--danger)] hover:text-[var(--danger)]'
          : 'hover:border-[var(--accent)] hover:text-[var(--accent)]'
      }`}
    >
      {children}
    </button>
  );
}
