/** Carte flottante avec icône, titre, sous-titre et slot d'action. */
const OverviewCard = ({
  icon: Icon,
  title,
  titleClassName = '',
  subtitle,
  action,
  sectionClassName = '',
  bodyClassName = '',
  children,
}) => (
  <div className="floating h-full">
    <section className={`cut-frame h-full p-5 ${sectionClassName}`}>
      <header className="mb-4 flex shrink-0 items-start gap-3">
        {Icon && <Icon size={24} className="mt-0.5 shrink-0 text-[var(--accent)]" />}
        <div className="min-w-0 flex-1">
          <h2 className={`font-display text-[20px] font-semibold ${titleClassName}`}>{title}</h2>
          {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
        </div>
        {action}
      </header>
      {bodyClassName ? <div className={bodyClassName}>{children}</div> : children}
    </section>
  </div>
);

export default OverviewCard;
