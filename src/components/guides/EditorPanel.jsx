/** Panneau à onglet unique (éditeur ou aperçu), avec actions à droite de l'en-tête. */
const EditorPanel = ({ icon: Icon, title, actions, className = '', children }) => (
  <div className={`floating min-h-0 ${className}`}>
    <section className="cut-frame flex h-full min-h-0 flex-col">
      <header className="flex items-center justify-between gap-3 border-b border-[var(--border)] pr-2">
        <h2 className="flex h-11 items-center gap-2 border-b-2 border-[var(--accent)] bg-[var(--accent-tint)] px-4 text-sm font-medium text-[var(--accent)]">
          <Icon size={16} /> {title}
        </h2>
        {actions}
      </header>
      {children}
    </section>
  </div>
);

export default EditorPanel;
