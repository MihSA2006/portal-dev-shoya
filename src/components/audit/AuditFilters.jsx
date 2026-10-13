import Dropdown from '../ui/Dropdown';
import { USER_FILTER, ACTION_FILTER, PROJECT_FILTER, RANGE_FILTER, RESULT_FILTER } from '../../constants/audit';

const FIELDS = [
  { key: 'user',    label: 'Utilisateur', options: USER_FILTER },
  { key: 'action',  label: 'Action',      options: ACTION_FILTER },
  { key: 'project', label: 'Projet',      options: PROJECT_FILTER },
  { key: 'range',   label: 'Période',     options: RANGE_FILTER },
  { key: 'result',  label: 'Résultat',    options: RESULT_FILTER },
];

export default function AuditFilters({ filters, onChange }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {FIELDS.map((f) => (
        <div key={f.key}>
          <p className="mb-2 text-sm text-[var(--text-soft)]">{f.label}</p>
          <Dropdown
            value={filters[f.key]}
            onChange={(value) => onChange({ [f.key]: value })}
            options={f.options}
            ariaLabel={f.label}
          />
        </div>
      ))}
    </div>
  );
}
