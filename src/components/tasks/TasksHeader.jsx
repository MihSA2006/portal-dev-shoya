import { Code2 } from 'lucide-react';

const TasksHeader = ({ cycle }) => (
  <header className="cut-frame overview-hero flex items-center gap-5 p-6">
    <div className="grid h-14 w-14 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
      <Code2 size={28} />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-[var(--accent)]">Engineering</p>
      <h1 className="font-display text-3xl font-semibold">Tâches du cycle</h1>
      <p className="mt-1 text-sm text-[var(--text-soft)]">
        {cycle ? `${cycle.label} — ${cycle.duration}` : 'Tous les cycles'}
      </p>
    </div>
  </header>
);

export default TasksHeader;
