import { Search } from 'lucide-react';
import { ABSENCE_STATUSES, ABSENCE_TYPES, DEFAULT_REQUEST_FILTERS, EMPLOYEES, PERIOD_FILTERS } from '../../constants/absences';
import SelectField from '../tasks/detail/SelectField';

const withAll = (label, list) => [{ id: 'all', label }, ...list];
const STATUS_OPTIONS = withAll('Tous les statuts', ABSENCE_STATUSES);
const TYPE_OPTIONS = withAll('Tous les types', ABSENCE_TYPES);
const EMPLOYEE_OPTIONS = withAll('Tous les collaborateurs', EMPLOYEES);
const PERIOD_OPTIONS = withAll('Toute période', PERIOD_FILTERS);

const RequestsFilters = ({ filters, onChange, onReset }) => {
  const dirty = JSON.stringify(filters) !== JSON.stringify(DEFAULT_REQUEST_FILTERS);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="field min-w-[14rem] flex-1">
        <Search className="shrink-0 text-[var(--text-muted)]" size={16} />
        <label className="sr-only" htmlFor="req-search">Rechercher une demande</label>
        <input id="req-search" type="search" value={filters.search} placeholder="Rechercher par collaborateur, type ou référence…"
          onChange={(e) => onChange('search', e.target.value)} />
      </span>
      <SelectField id="req-status" label="Statut" value={filters.status} options={STATUS_OPTIONS} onChange={(v) => onChange('status', v)} className="w-48" />
      <SelectField id="req-type" label="Type" value={filters.type} options={TYPE_OPTIONS} onChange={(v) => onChange('type', v)} className="w-40" />
      <SelectField id="req-employee" label="Collaborateur" value={filters.employee} options={EMPLOYEE_OPTIONS} onChange={(v) => onChange('employee', v)} className="w-52" />
      <SelectField id="req-period" label="Période" value={filters.period} options={PERIOD_OPTIONS} onChange={(v) => onChange('period', v)} className="w-40" />
      {dirty && (
        <button className="text-sm text-[var(--accent)] hover:underline" type="button" onClick={onReset}>Réinitialiser</button>
      )}
    </div>
  );
};

export default RequestsFilters;
