import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import AuditRow from './AuditRow';

const COLUMNS = [
  { key: 'timestamp', label: 'Horodatage' },
  { key: 'user',      label: 'Utilisateur' },
  { key: 'action',    label: 'Action' },
  { key: 'resource',  label: 'Ressource' },
  { key: 'project',   label: 'Projet' },
  { key: 'ip',        label: 'Adresse IP' },
  { key: 'result',    label: 'Résultat' },
];

export default function AuditTable({ rows, sort, onSort, onDetail }) {
  return (
    <div className="min-h-[18rem] overflow-x-auto">
      <table className="w-full min-w-[1040px] text-left">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
            {COLUMNS.map((c) => {
              const active = sort.key === c.key;
              const SortIcon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown;
              return (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className="px-4 py-3.5 font-medium"
                >
                  <button
                    type="button"
                    onClick={() => onSort(c.key)}
                    className={`inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text)] ${active ? 'text-[var(--accent)]' : ''}`}
                  >
                    {c.label} <SortIcon size={13} />
                  </button>
                </th>
              );
            })}
            <th scope="col" className="px-2 py-3.5"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((event, i) => (
            <AuditRow key={event.id} event={event} dropUp={i >= 6} onDetail={onDetail} />
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p className="px-5 py-14 text-center text-sm text-[var(--text-muted)]">
          Aucun événement ne correspond aux filtres sélectionnés.
        </p>
      )}
    </div>
  );
}
