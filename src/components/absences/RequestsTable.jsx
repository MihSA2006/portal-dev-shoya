import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, SearchX } from 'lucide-react';
import { EMPLOYEES_BY_ID, REQUESTS_PER_PAGE } from '../../constants/absences';
import { formatDate } from '../../utils/calendar';
import EmployeeAvatar from './EmployeeAvatar';
import StatusBadge from './StatusBadge';
import TypeBadge from './TypeBadge';

const TH = 'whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]';
const TD = 'whitespace-nowrap px-4 py-3 text-sm';

const RequestsTable = ({ rows, resetKey, onOpen, onApprove, onReject }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / REQUESTS_PER_PAGE));
  const current = Math.min(page, pageCount);
  const slice = rows.slice((current - 1) * REQUESTS_PER_PAGE, current * REQUESTS_PER_PAGE);

  useEffect(() => setPage(1), [resetKey]);

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center px-5 py-12 text-center">
        <SearchX className="mb-3 text-[var(--text-muted)]" size={30} strokeWidth={1.5} />
        <p className="font-medium">Aucune demande ne correspond</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Modifiez ou réinitialisez les filtres.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <caption className="sr-only">Demandes d'absence</caption>
          <thead className="border-b border-[var(--border)] bg-[var(--bg-elevated)]">
            <tr>
              {['Référence', 'Collaborateur', 'Type', 'Début', 'Fin', 'Soumise le', 'Statut', 'Actions'].map((h) => (
                <th key={h} scope="col" className={TH}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((a) => {
              const employee = EMPLOYEES_BY_ID[a.employeeId];
              return (
                <tr key={a.id} className="cursor-pointer border-b border-[var(--border)] last:border-0 hover:bg-[var(--accent-tint)]" onClick={() => onOpen(a.id)}>
                  <td className={`${TD} font-mono text-xs`}>{a.id}</td>
                  <td className={TD}>
                    <span className="flex items-center gap-2.5"><EmployeeAvatar employee={employee} size="sm" />{employee?.label}</span>
                  </td>
                  <td className={TD}><TypeBadge type={a.type} /></td>
                  <td className={TD}>{formatDate(a.startDate)}</td>
                  <td className={TD}>{formatDate(a.endDate)}</td>
                  <td className={TD}>{formatDate(a.submittedAt)}</td>
                  <td className={TD}><StatusBadge status={a.status} /></td>
                  <td className={TD}>
                    <span className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {a.status === 'pending' && (
                        <>
                          <button className="btn btn-outline !h-8 px-3 text-xs" type="button" onClick={() => onApprove(a.id)}>Approuver</button>
                          <button className="btn btn-danger !h-8 px-3 text-xs" type="button" onClick={() => onReject(a.id)}>Refuser</button>
                        </>
                      )}
                      <button className="icon-btn !h-8 !w-8" type="button" onClick={() => onOpen(a.id)} aria-label={`Voir la demande ${a.id}`}>
                        <Eye size={16} />
                      </button>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
        <span>
          {(current - 1) * REQUESTS_PER_PAGE + 1}–{Math.min(current * REQUESTS_PER_PAGE, rows.length)} sur {rows.length}
        </span>
        <div className="flex items-center gap-2">
          <button className="icon-btn !h-8 !w-8 border border-[var(--border)]" type="button" disabled={current === 1} onClick={() => setPage(current - 1)} aria-label="Page précédente">
            <ChevronLeft size={16} />
          </button>
          <span>Page {current} / {pageCount}</span>
          <button className="icon-btn !h-8 !w-8 border border-[var(--border)]" type="button" disabled={current === pageCount} onClick={() => setPage(current + 1)} aria-label="Page suivante">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestsTable;
