import { CheckSquare, CirclePlus, ListTodo } from 'lucide-react';

const Tasks = () => (
  <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-[var(--accent)]">ORGANISATION</p>
        <h1 className="mt-1 font-display text-3xl font-semibold">Tâches</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">Suivez vos tâches et leur avancement.</p>
      </div>
      <button className="inline-flex items-center gap-2 border border-[var(--border-strong)] px-4 py-2.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent-tint)]" type="button">
        <CirclePlus size={17} />
        Nouvelle tâche
      </button>
    </header>

    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { label: 'À faire', value: '—' },
        { label: 'En cours', value: '—' },
        { label: 'Terminées', value: '—' },
      ].map(({ label, value }) => (
        <div className="cut-frame p-4 [--frame-bg:var(--surface)]" key={label}>
          <p className="text-sm text-[var(--text-muted)]">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
        </div>
      ))}
    </div>

    <section className="cut-frame [--frame-bg:var(--surface)]" aria-labelledby="tasks-list-title">
      <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-4">
        <CheckSquare className="text-[var(--accent)]" size={19} />
        <h2 id="tasks-list-title" className="font-display text-lg font-semibold">Toutes les tâches</h2>
      </div>
      <div className="flex flex-col items-center px-5 py-12 text-center">
        <ListTodo className="mb-3 text-[var(--text-muted)]" size={30} strokeWidth={1.5} />
        <p className="font-medium">Aucune tâche pour le moment</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Les tâches qui vous sont attribuées apparaîtront dans cette liste.</p>
      </div>
    </section>
  </div>
);

export default Tasks;
