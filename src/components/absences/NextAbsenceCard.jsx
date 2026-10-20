import { ArrowRight, CalendarClock } from 'lucide-react';
import { ABSENCE_TYPES_BY_ID, EMPLOYEES_BY_ID } from '../../constants/absences';
import { formatDateRange } from '../../utils/calendar';
import EmployeeAvatar from './EmployeeAvatar';
import StatusBadge from './StatusBadge';

const NextAbsenceCard = ({ absence, onOpen }) => {
  const employee = absence && EMPLOYEES_BY_ID[absence.employeeId];
  return (
    <section className="cut-frame p-5 [--frame-bg:var(--surface)]" aria-labelledby="next-absence-title">
      <h2 id="next-absence-title" className="flex items-center gap-2.5 font-display text-sm font-semibold">
        <CalendarClock className="text-[var(--accent)]" size={17} />
        Prochaine absence
      </h2>

      {absence ? (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <EmployeeAvatar employee={employee} size="lg" />
            <div className="min-w-0">
              <p className="truncate font-medium">{employee?.label}</p>
              <p className="text-sm text-[var(--text-muted)]">{ABSENCE_TYPES_BY_ID[absence.type]?.label}</p>
            </div>
          </div>
          <StatusBadge status={absence.status} />
          <p className="text-xs text-[var(--text-muted)]">{formatDateRange(absence.startDate, absence.endDate)}</p>
          <button className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline" type="button" onClick={() => onOpen(absence.id)}>
            Voir la demande <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        <p className="mt-4 text-sm text-[var(--text-muted)]">Aucune absence validée à venir.</p>
      )}
    </section>
  );
};

export default NextAbsenceCard;
