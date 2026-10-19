import { AlertTriangle, Boxes, FileCheck2, Rocket } from 'lucide-react';

const Card = ({ icon: Icon, tone, label, value, hint }) => (
  <div className="floating">
    <div data-tone={tone} className="cut-frame cut-sm flex items-center gap-4 p-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[color-mix(in_srgb,var(--tone)_16%,transparent)] text-[var(--tone)]">
        <Icon size={26} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-[var(--text-soft)]">{label}</p>
        <p className="font-display text-2xl font-semibold leading-tight">{value}</p>
        <p className="truncate text-xs text-[var(--text-muted)]">{hint}</p>
      </div>
    </div>
  </div>
);

const EndpointStats = ({ stats }) => (
  <section aria-label="Statistiques" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <Card icon={Boxes} tone="accent" label="Endpoints au total" value={stats.total} hint={`Sur ${stats.projects} projet${stats.projects > 1 ? 's' : ''}`} />
    <Card icon={Rocket} tone="accent" label="En production" value={stats.production} hint="Tous environnements" />
    <Card
      icon={FileCheck2}
      tone="lead"
      label="Documentation complète"
      value={<>{stats.complete} <span className="text-base text-[var(--text-muted)]">/ {stats.total}</span></>}
      hint={`${stats.coverage}% de couverture`}
    />
    <Card icon={AlertTriangle} tone="admin" label="À traiter" value={stats.attention} hint="Documentation incomplète ou en relecture" />
  </section>
);

export default EndpointStats;
