/** Carte standard : en-tête (icône + titre + badge) + étiquette de filtre actif (`scope`) + contenu. */
export default function DashCard({ title, icon: Icon, badge, scope, aside, className = '', bodyClassName = 'p-5', children }) {
  return (
    <section className={`cut-frame [--frame-bg:var(--surface)] ${className}`}>
      <div className={bodyClassName}>
        <header className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <h2 className="flex items-center gap-3 font-display text-lg font-semibold text-[var(--text)]">
            {Icon && <Icon size={22} className="shrink-0 text-[var(--accent)]" />}
            {title}
            {badge}
          </h2>
          {(scope || aside) && (
            <div className="flex items-center gap-2">
              {scope && (
                <span data-tone="accent" className="tone-badge px-2 py-0.5 text-[11px] font-medium">{scope}</span>
              )}
              {aside}
            </div>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}