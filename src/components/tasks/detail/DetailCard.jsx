// Carte générique de la page de détail (titre + icône + action optionnelle).
const DetailCard = ({ icon: Icon, title, action, className = '', children }) => (
  <section className={`cut-frame [--frame-bg:var(--surface)] ${className}`}>
    <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
      <Icon className="shrink-0 text-[var(--accent)]" size={19} />
      <h2 className="flex-1 font-display text-base font-semibold">{title}</h2>
      {action}
    </div>
    <div className="p-5">{children}</div>
  </section>
);

export default DetailCard;
