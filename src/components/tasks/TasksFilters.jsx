import { Box, Calendar, CirclePlus, CircleDot, RotateCcw, User } from 'lucide-react';
import { ASSIGNEES, CYCLES, PROJECTS, TASK_STATUSES } from '../../constants/tasks';
import Dropdown from '../ui/Dropdown';

const FilterSelect = ({ label, icon: Icon, value, onChange, options, allLabel }) => (
  <div className="block min-w-[10rem] flex-1">
    <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{label}</span>
    <Dropdown
      value={value}
      onChange={onChange}
      options={[{ value: 'all', label: allLabel }, ...options.map(({ id, label: optionLabel }) => ({ value: id, label: optionLabel }))]}
      ariaLabel={label}
      icon={Icon}
    />
  </div>
);

const TasksFilters = ({ filters, onChange, onReset, onCreate }) => (
  <div className="cut-frame flex flex-wrap items-end gap-4 p-4 [--frame-bg:var(--bg-elevated)]">
    <FilterSelect label="Projet" icon={Box} value={filters.project} options={PROJECTS}
      allLabel="Tous les projets" onChange={(v) => onChange('project', v)} />
    <FilterSelect label="Assigné" icon={User} value={filters.assignee} options={ASSIGNEES}
      allLabel="Tous les assignés" onChange={(v) => onChange('assignee', v)} />
    <FilterSelect label="Statut" icon={CircleDot} value={filters.status} options={TASK_STATUSES}
      allLabel="Tous les statuts" onChange={(v) => onChange('status', v)} />
    <FilterSelect label="Cycle" icon={Calendar} value={filters.cycle} options={CYCLES}
      allLabel="Tous les cycles" onChange={(v) => onChange('cycle', v)} />

    <div className="flex items-center gap-2">
      <button className="btn btn-outline" type="button" onClick={onCreate}>
        <CirclePlus size={18} />
        Créer une tâche
      </button>
      <button className="icon-btn border border-[var(--border)]" type="button"
        onClick={onReset} aria-label="Réinitialiser les filtres" title="Réinitialiser les filtres">
        <RotateCcw size={17} />
      </button>
    </div>
  </div>
);

export default TasksFilters;
