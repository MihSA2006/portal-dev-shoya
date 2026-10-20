import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ABSENCE_TYPES, CALENDAR_VIEWS, EMPLOYEES } from '../../constants/absences';
import SelectField from '../tasks/detail/SelectField';

const EMPLOYEE_OPTIONS = [{ id: 'all', label: 'Tous les collaborateurs' }, ...EMPLOYEES];
const TYPE_OPTIONS = [{ id: 'all', label: 'Tous les types' }, ...ABSENCE_TYPES];

const CalendarToolbar = ({ title, state, onView, onPrev, onNext, onToday, onFilter }) => (
  <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border)] p-4">
    <div className="flex items-center gap-2">
      <button className="icon-btn border border-[var(--border)]" type="button" onClick={onPrev} aria-label="Période précédente">
        <ChevronLeft size={18} />
      </button>
      <button className="icon-btn border border-[var(--border)]" type="button" onClick={onNext} aria-label="Période suivante">
        <ChevronRight size={18} />
      </button>
      <button className="btn btn-outline !h-10" type="button" onClick={onToday}>Aujourd'hui</button>
    </div>

    <h2 className="font-display text-xl font-semibold" aria-live="polite">{title}</h2>

    <div className="ml-auto flex flex-wrap items-center gap-3">
      <div className="flex border border-[var(--border-strong)]" role="group" aria-label="Affichage du calendrier">
        {CALENDAR_VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={state.view === v.id}
            onClick={() => onView(v.id)}
            className={`h-10 px-4 text-sm font-medium ${state.view === v.id ? 'bg-[var(--accent-tint)] text-[var(--accent)]' : 'text-[var(--text-soft)] hover:text-[var(--accent)]'}`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <SelectField id="cal-employee" label="Filtrer par collaborateur" value={state.employee}
        onChange={(v) => onFilter('employee', v)} options={EMPLOYEE_OPTIONS} className="w-52" />
      <SelectField id="cal-type" label="Filtrer par type" value={state.type}
        onChange={(v) => onFilter('type', v)} options={TYPE_OPTIONS} className="w-44" />
    </div>
  </div>
);

export default CalendarToolbar;
