/** Carte d'édition : coin coupé sans clip-path (les menus déroulants peuvent déborder). */
export default function EditCard({ title, icon: Icon, action, className = '', children }) {
  return (
    <section
      className={`cut-open [--frame-bg:var(--surface)] focus-within:z-20 [&:has([aria-expanded=true])]:z-20 ${className}`}
    >
      <div className="p-5">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-3 font-display text-lg font-semibold text-[var(--text)]">
            {Icon && <Icon size={20} className="shrink-0 text-[var(--accent)]" />}
            {title}
          </h2>
          {action}
        </header>
        {children}
      </div>
    </section>
  );
}
