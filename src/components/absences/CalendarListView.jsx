import { CalendarOff } from 'lucide-react';
import { EMPLOYEES_BY_ID } from '../../constants/absences';
import { formatDuration } from '../../utils/absences';
import { formatDateRange } from '../../utils/calendar';
import EmployeeAvatar from './EmployeeAvatar';
import StatusBadge from './StatusBadge';
import TypeBadge from './TypeBadge';

const CalendarListView = ({ absences, onOpenAbsence }) => {
  if (absences.length === 0) {
    return (
      <div className="flex flex-col items-center px-5 py-14 text-center">
        <CalendarOff className="mb-3 text-[var(--text-muted)]" size={30} strokeWidth={1.5} />
        <p className="font-medium">Aucune absence sur cette période</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Modifiez les filtres ou changez de mois.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-[var(--border)]">
      {absences.map((a) => {
        const employee = EMPLOYEES_BY_ID[a.employeeId];
        return (
          <li key={a.id}>
            <button type="button" className="flex w-full flex-wrap items-center gap-4 px-5 py-3 text-left hover:bg-[var(--accent-tint)]" onClick={() => onOpenAbsence(a.id)}>
              <EmployeeAvatar employee={employee} />
              <div className="min-w-0 flex-1 basis-48">
                <p className="truncate text-sm font-medium">{employee?.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{formatDateRange(a.startDate, a.endDate)} · {formatDuration(a)}</p>
              </div>
              <TypeBadge type={a.type} />
              <StatusBadge status={a.status} />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default CalendarListView;
