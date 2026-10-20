const Block = ({ className = '' }) => (
  <span className={`skeleton-block block ${className}`} aria-hidden="true" />
);

const Card = ({ className = '', children }) => (
  <div className={`cut-frame space-y-4 p-5 [--frame-bg:var(--surface)] ${className}`} aria-hidden="true">
    {children ?? (
      <>
        <Block className="h-4 w-2/5" />
        <Block className="h-3 w-full" />
        <Block className="h-3 w-4/5" />
        <Block className="h-24 w-full" />
      </>
    )}
  </div>
);

const Header = () => (
  <div className="cut-frame flex items-center gap-4 p-5 [--frame-bg:var(--surface)]" aria-hidden="true">
    <Block className="h-12 w-12 shrink-0" />
    <div className="flex-1 space-y-2">
      <Block className="h-7 w-48 max-w-full" />
      <Block className="h-3 w-3/5 max-w-full" />
    </div>
  </div>
);

const StatCards = ({ count = 4 }) => (
  <div className="grid grid-cols-2 gap-4 xl:grid-cols-4" aria-hidden="true">
    {Array.from({ length: count }, (_, index) => (
      <Card key={index} className="flex items-center gap-4">
        <Block className="h-12 w-12 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Block className="h-3 w-4/5" />
          <Block className="h-7 w-1/2" />
          <Block className="h-3 w-3/5" />
        </div>
      </Card>
    ))}
  </div>
);

export function DashboardSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement du tableau de bord">
      <Header />
      <Block className="h-11 w-full" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-6" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => <Block key={index} className="h-36" />)}
      </div>
      <div className="grid gap-5 2xl:grid-cols-2"><Card /><Card /></div>
      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4"><Card /><Card /><Card /><Card /></div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function DocumentationSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Chargement de la documentation">
      <Header />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"><Card /><Card /><Card /></div>
      <div className="grid gap-5 xl:grid-cols-2"><Card /><Card /></div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function ProjectOverviewSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement de la vue d'ensemble">
      <Header />
      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <Card className="min-h-48" />
          <div className="grid gap-5 2xl:grid-cols-2"><Card /><Card /></div>
          <div className="grid gap-5 xl:grid-cols-2"><Card /><Card /></div>
        </div>
        <div className="space-y-5"><Card /><Card /></div>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function EndpointSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement de l'endpoint">
      <Header />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)]">
        <div className="space-y-5"><Card /><Card /><Card /><Card /></div>
        <div className="space-y-5"><Card className="min-h-72" /><Card className="min-h-48" /></div>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function ActivityEntrySkeleton() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]" role="status" aria-label="Chargement des endpoints">
      <Card className="min-h-[40rem]">{Array.from({ length: 12 }, (_, index) => <Block key={index} className="h-9 w-full" />)}</Card>
      <div className="min-w-0 space-y-5">
        <Header />
        <StatCards count={4} />
        <Block className="h-12 w-full" />
        <div className="space-y-3 cut-frame p-5 [--frame-bg:var(--surface)]" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => <Block key={index} className="h-12 w-full" />)}
        </div>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function TasksSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement des tâches">
      <Header />
      <Block className="h-12 w-full" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 4 }, (_, column) => (
          <div key={column} className="cut-frame min-h-96 space-y-4 p-4 [--frame-bg:var(--surface)]">
            <Block className="h-5 w-2/3" />
            {Array.from({ length: 3 }, (_, row) => <Block key={row} className="h-36 w-full" />)}
          </div>
        ))}
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function AbsencesSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement des absences">
      <Header />
      <StatCards count={4} />
      <Card>
        <Block className="h-12 w-full" />
        <div className="grid grid-cols-7" aria-hidden="true">{Array.from({ length: 35 }, (_, index) => <Block key={index} className="h-16 border border-[var(--border)]" />)}</div>
      </Card>
      <Card className="min-h-64"><Block className="h-12 w-full" />{Array.from({ length: 4 }, (_, index) => <Block key={index} className="h-10 w-full" />)}</Card>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function AdminUsersSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement des utilisateurs">
      <Header />
      <StatCards count={5} />
      <Card className="min-h-96"><Block className="h-12 w-full" />{Array.from({ length: 7 }, (_, index) => <Block key={index} className="h-12 w-full" />)}</Card>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function AdminProjectsSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Chargement des projets">
      <Header />
      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
        <Card className="min-h-[36rem]">{Array.from({ length: 7 }, (_, index) => <Block key={index} className="h-14 w-full" />)}</Card>
        <div className="space-y-5"><Card className="min-h-64" /><Card className="min-h-56" /></div>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}

export function AdminTableSkeleton({ label = 'Chargement des données' }) {
  return (
    <div className="space-y-5" role="status" aria-label={label}>
      <Header />
      <Card className="min-h-96"><Block className="h-12 w-full" />{Array.from({ length: 8 }, (_, index) => <Block key={index} className="h-12 w-full" />)}</Card>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
