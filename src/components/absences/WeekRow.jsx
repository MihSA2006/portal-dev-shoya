import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { ABSENCE_STATUSES_BY_ID, ABSENCE_TYPES_BY_ID, EMPLOYEES_BY_ID } from '../../constants/absences';
import { formatDayLong, isWeekend, parseISO } from '../../utils/calendar';
import { formatDuration, layoutWeek } from '../../utils/absences';
import { TYPE_ICONS } from './TypeBadge';

// Une semaine : 7 cellules cliquables + une couche de barres qui peuvent s'étendre sur plusieurs jours.
const WeekRow = ({
  week, absences, today, month, maxLanes, tall, selection,
  onDayDown, onDayEnter, onDayClick, onOpenAbsence, onOpenDay,
}) => {
  const { visible, hidden } = useMemo(() => layoutWeek(week, absences, maxLanes), [week, absences, maxLanes]);
  const lanes = visible.reduce((m, s) => Math.max(m, s.lane + 1), 0);
  const minHeight = tall ? `${Math.max(13, 2.5 + lanes * 1.35)}rem` : '6rem';

  return (
    <div className="relative" style={{ minHeight }}>
      <div className="grid h-full grid-cols-7" style={{ minHeight }}>
        {week.map((iso) => {
          const inRange = selection && iso >= selection[0] && iso <= selection[1];
          const classes = [
            'abs-day',
            isWeekend(iso) && 'is-weekend',
            month && iso.slice(0, 7) !== month && 'is-outside',
            iso === today && 'is-today',
            inRange && 'is-selected',
          ].filter(Boolean).join(' ');
          return (
            <button
              key={iso}
              type="button"
              className={classes}
              aria-label={`${formatDayLong(iso)} : déclarer une absence`}
              onMouseDown={(e) => e.button === 0 && onDayDown(iso)}
              onMouseEnter={() => onDayEnter(iso)}
              onClick={(e) => e.detail === 0 && onDayClick(iso)}
            >
              <span className="abs-day-num">{parseISO(iso).getDate()}</span>
            </button>
          );
        })}
      </div>

      <div className="abs-week-overlay">
        {visible.map(({ absence: a, startCol, endCol, lane, continuesBefore, continuesAfter }) => {
          const type = ABSENCE_TYPES_BY_ID[a.type];
          const employee = EMPLOYEES_BY_ID[a.employeeId];
          const Icon = TYPE_ICONS[a.type];
          const status = ABSENCE_STATUSES_BY_ID[a.status].label;
          return (
            <button
              key={a.id}
              type="button"
              data-tone={type.tone}
              className={`abs-bar ${a.status === 'pending' ? 'is-pending' : ''} ${continuesBefore ? 'cont-before' : ''} ${continuesAfter ? 'cont-after' : ''}`}
              style={{ gridColumn: `${startCol + 1} / ${endCol + 2}`, gridRow: lane + 1 }}
              title={`${employee?.label} — ${type.label} (${formatDuration(a)}) · ${status}`}
              aria-label={`${employee?.label}, ${type.label}, ${status}`}
              onClick={() => onOpenAbsence(a.id)}
            >
              <Icon size={13} className="shrink-0" />
              <span className="truncate">{employee?.label} • {type.label}</span>
              {continuesAfter && <ArrowRight size={13} className="ml-auto shrink-0" />}
            </button>
          );
        })}

        {hidden.map((count, col) =>
          count > 0 ? (
            <button
              key={`more-${week[col]}`}
              type="button"
              className="abs-more"
              style={{ gridColumn: col + 1, gridRow: maxLanes + 1 }}
              onClick={() => onOpenDay(week[col])}
            >
              +{count} {count > 1 ? 'autres' : 'autre'}
            </button>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default WeekRow;
