import { DOC_STATUS, LIFECYCLE, METHODS } from '../../constants/endpointMeta';
import { ownerName, unique } from '../../utils/endpointRegistry';
import Dropdown from '../ui/Dropdown';

const FilterSelect = ({ label, value, onChange, options, allLabel }) => (
  <div className="flex items-center gap-1.5">
    <span className="shrink-0 text-xs text-[var(--text-muted)]">{label} :</span>
    <Dropdown
      value={value}
      onChange={onChange}
      options={[{ value: 'all', label: allLabel }, ...options]}
      ariaLabel={label}
      className="min-w-0"
      triggerClassName="!h-10 !w-auto !max-w-[10rem] !gap-1.5 !px-3 text-xs"
    />
  </div>
);

const asOptions = (values) => values.map((v) => ({ value: v, label: v }));

/** Filtres déroulants ; les options dépendent des données. */
const EndpointFilters = ({ filters, onChange, rows, projects, canClear, onClear }) => (
  <div className="flex flex-wrap items-center gap-3">
    <FilterSelect label="Projet" allLabel="Tous" value={filters.project} onChange={(v) => onChange({ project: v })} options={projects.map((p) => ({ value: String(p.id), label: p.name }))} />
    <FilterSelect label="Méthode" allLabel="Toutes" value={filters.method} onChange={(v) => onChange({ method: v })} options={asOptions(METHODS)} />
    <FilterSelect label="Statut" allLabel="Tous" value={filters.status} onChange={(v) => onChange({ status: v })} options={Object.entries(LIFECYCLE).map(([value, { label }]) => ({ value, label }))} />
    <FilterSelect label="Section" allLabel="Toutes" value={filters.section} onChange={(v) => onChange({ section: v })} options={asOptions(unique(rows, (r) => r.section))} />
    <FilterSelect label="Version" allLabel="Toutes" value={filters.version} onChange={(v) => onChange({ version: v })} options={asOptions(unique(rows, (r) => r.version))} />
    <FilterSelect label="Responsable" allLabel="Tous" value={filters.owner} onChange={(v) => onChange({ owner: v })} options={unique(rows, (r) => r.owner).map((o) => ({ value: o, label: ownerName(o) }))} />
    <FilterSelect
      label="Documentation"
      allLabel="Toutes"
      value={filters.doc}
      onChange={(v) => onChange({ doc: v })}
      options={[...Object.entries(DOC_STATUS).map(([value, { label }]) => ({ value, label })), { value: 'todo', label: 'À traiter (non complète)' }]}
    />
    {canClear && (
      <button type="button" onClick={onClear} className="ml-auto text-xs text-[var(--cyan)] hover:underline">Effacer les filtres</button>
    )}
  </div>
);

export default EndpointFilters;
