import { useEffect, useMemo, useState } from 'react';
import { ABSENCE_TYPES, MAX_LANES, WEEKDAYS } from '../../constants/absences';
import { overlaps, visibleOnCalendar } from '../../utils/absences';
import {
  addDays, addMonths, endOfMonth, formatMonthYear, formatWeekRange, monthGrid,
  startOfMonth, todayISO, weekDays,
} from '../../utils/calendar';
import CalendarListView from './CalendarListView';
import CalendarToolbar from './CalendarToolbar';
import WeekRow from './WeekRow';

const order = (a, b) => (a <= b ? [a, b] : [b, a]);

const AbsenceCalendar = ({ absences, state, onState, onSelectRange, onOpenAbsence, onOpenDay }) => {
  const { view, cursor, employee, type } = state;
  const today = todayISO();
  const [drag, setDrag] = useState(null);

  const visible = useMemo(() => visibleOnCalendar(absences, { employee, type }), [absences, employee, type]);
  const weeks = useMemo(() => (view === 'week' ? [weekDays(cursor)] : monthGrid(cursor)), [view, cursor]);
  const listItems = useMemo(
    () =>
      visible
        .filter((a) => overlaps(a, startOfMonth(cursor), endOfMonth(cursor)))
        .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.id.localeCompare(b.id)),
    [visible, cursor],
  );

  const selection = drag ? order(drag.anchor, drag.current) : null;

  // La sélection par glisser se termine au relâchement, même hors du calendrier.
  useEffect(() => {
    if (!drag) return undefined;
    const up = () => {
      const [start, end] = order(drag.anchor, drag.current);
      setDrag(null);
      onSelectRange(start, end);
    };
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, [drag, onSelectRange]);

  const move = (dir) =>
    onState({ cursor: view === 'week' ? addDays(cursor, 7 * dir) : addMonths(cursor, dir) });

  const title = view === 'week' ? formatWeekRange(cursor) : formatMonthYear(cursor);

  return (
    <section className="cut-frame [--frame-bg:var(--surface)]" aria-label="Calendrier des absences">
      <CalendarToolbar
        title={title}
        state={state}
        onView={(v) => onState({ view: v })}
        onPrev={() => move(-1)}
        onNext={() => move(1)}
        onToday={() => onState({ cursor: today })}
        onFilter={(key, value) => onState({ [key]: value })}
      />

      {view === 'list' ? (
        <CalendarListView absences={listItems} onOpenAbsence={onOpenAbsence} />
      ) : (
        <div className="select-none overflow-x-auto">
          <div className="min-w-[36rem] xl:min-w-[44rem]">
            <div className="grid grid-cols-7 border-b border-[var(--border)] bg-[var(--bg-elevated)]">
              {WEEKDAYS.map((d) => (
                <p key={d} className="px-2 py-2 text-center text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{d}</p>
              ))}
            </div>
            {weeks.map((week) => (
              <WeekRow
                key={week[0]}
                week={week}
                absences={visible}
                today={today}
                month={view === 'month' ? cursor.slice(0, 7) : null}
                maxLanes={view === 'month' ? MAX_LANES : 99}
                tall={view === 'week'}
                selection={selection}
                onDayDown={(iso) => setDrag({ anchor: iso, current: iso })}
                onDayEnter={(iso) => drag && setDrag((d) => ({ ...d, current: iso }))}
                onDayClick={(iso) => onSelectRange(iso, iso)}
                onOpenAbsence={onOpenAbsence}
                onOpenDay={onOpenDay}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--text-soft)]">
        {ABSENCE_TYPES.map((t) => (
          <span key={t.id} className="flex items-center gap-2" data-tone={t.tone}>
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--tone)]" />
            {t.label}
          </span>
        ))}
        <span className="flex items-center gap-2" data-tone="muted">
          <span className="abs-bar is-pending !m-0 !h-3 w-6 !p-0" aria-hidden="true" />
          En attente de validation
        </span>
        <span className="ml-auto hidden text-[var(--text-muted)] md:inline">
          Cliquez sur un jour ou glissez sur plusieurs jours pour déclarer une absence.
        </span>
      </div>
    </section>
  );
};

export default AbsenceCalendar;
