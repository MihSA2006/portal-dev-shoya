import { Plus } from 'lucide-react';
import { EMPLOYEES_BY_ID } from '../../../constants/absences';
import { formatDuration } from '../../../utils/absences';
import EmployeeAvatar from '../EmployeeAvatar';
import StatusBadge from '../StatusBadge';
import TypeBadge from '../TypeBadge';

// Toutes les absences d'un jour (ouvert depuis « +N autres »).
const DayAbsences = ({ absences, onOpen, onCreate }) => (
  <div className="flex h-full flex-col">
    <ul className="min-h-0 flex-1 divide-y divide-[var(--border)] overflow-y-auto">
      {absences.length === 0 && <li className="px-5 py-8 text-sm text-[var(--text-muted)]">Aucune absence ce jour-là.</li>}
      {absences.map((a) => {
        const employee = EMPLOYEES_BY_ID[a.employeeId];
        return (
          <li key={a.id}>
            <button type="button" className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-[var(--accent-tint)]" onClick={() => onOpen(a.id)}>
              <EmployeeAvatar employee={employee} />
              <div className="min-w-0 flex-1 space-y-1.5">
                <p className="truncate text-sm font-medium">{employee?.label}</p>
                <div className="flex flex-wrap items-center gap-2"><TypeBadge type={a.type} /><StatusBadge status={a.status} /></div>
              </div>
              <span className="shrink-0 text-xs text-[var(--text-muted)]">{formatDuration(a)}</span>
            </button>
          </li>
        );
      })}
    </ul>
    <div className="border-t border-[var(--border)] px-5 py-4">
      <button className="btn btn-outline w-full" type="button" onClick={onCreate}><Plus size={17} />Déclarer une absence ce jour</button>
    </div>
  </div>
);

export default DayAbsences;
