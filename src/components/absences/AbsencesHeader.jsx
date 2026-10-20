import { CalendarDays, Plus } from 'lucide-react';
import ExportMenu from './ExportMenu';

const AbsencesHeader = ({ onCreate, onExport }) => (
  <header className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
        <CalendarDays size={24} />
      </span>
      <div>
        <h1 className="font-display text-3xl font-semibold">Gestion des absences</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Suivez la disponibilité de l'équipe, déclarez des absences et gérez les validations.
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="btn btn-primary" type="button" onClick={() => onCreate()}>
        <Plus size={18} />
        Déclarer une absence
      </button>
      <ExportMenu onExport={onExport} />
    </div>
  </header>
);

export default AbsencesHeader;
