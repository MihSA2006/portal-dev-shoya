/** Panneau flottant avec titre et icône. */
const DocPanel = ({ icon: Icon, title, children }) => (
  <div className="floating">
    <section className="cut-frame p-5">
      <h2 className="mb-4 flex items-center gap-3 font-display text-lg font-semibold">
        <Icon size={22} className="text-[var(--accent)]" /> {title}
      </h2>
      {children}
    </section>
  </div>
);

export default DocPanel;
