import { CalendarDays, CalendarOff, Info } from 'lucide-react';

const Absences = () => (
  <div className="space-y-6">
    <header>
      <p className="text-sm font-medium text-[var(--accent)]">TEMPS ET CONGÉS</p>
      <h1 className="mt-1 font-display text-3xl font-semibold">Absences</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Consultez vos absences et demandes de congé.</p>
    </header>

    <div className="grid gap-4 md:grid-cols-2">
      <section className="cut-frame p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-[var(--accent)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Mes absences</h2>
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">Aucune absence à afficher pour le moment.</p>
      </section>

      <section className="cut-frame p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-3">
          <CalendarOff className="text-[var(--cyan)]" size={20} />
          <h2 className="font-display text-lg font-semibold">Demandes en attente</h2>
        </div>
        <p className="mt-4 text-sm text-[var(--text-muted)]">Vous n’avez aucune demande en attente.</p>
      </section>
    </div>

    <div className="flex items-start gap-3 border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-soft)]">
      <Info className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} />
      <p>Les soldes de congés et les demandes seront disponibles lorsque les données de votre espace seront configurées.</p>
    </div>
  </div>
);

export default Absences;
