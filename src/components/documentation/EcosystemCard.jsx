const Stat = ({ value, label }) => (
  <div className="px-4 first:pl-0 last:pr-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-[var(--border)]">
    <p className="font-display text-xl font-semibold text-[var(--accent)]">{value}</p>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
  </div>
);

const EcosystemCard = ({ stats }) => (
  <div className="floating">
    <div className="cut-frame cut-sm px-5 py-3">
      <p className="mb-2 text-xs text-[var(--text-muted)]">Écosystème API</p>
      <div className="flex">
        <Stat value={stats.projects} label="Projets" />
        <Stat value={stats.endpoints} label="Endpoints" />
        <Stat value={stats.versions} label="Versions" />
        <Stat value={`${stats.coverage}%`} label="Couverture" />
      </div>
    </div>
  </div>
);

export default EcosystemCard;
