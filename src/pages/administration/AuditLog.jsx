import { useMemo, useState } from 'react';
import { ShieldCheck, Download } from 'lucide-react';
import AuditFilters from '../../components/audit/AuditFilters';
import AuditTable from '../../components/audit/AuditTable';
import AuditDetailModal from '../../components/audit/AuditDetailModal';
import Pagination from '../../components/ui/Pagination';
import { downloadCsv } from '../../utils/csv';
import { ACTIONS, RESULTS, RANGE_MS, generateAuditEvents, formatTimestamp } from '../../constants/audit';

const PAGE_SIZE = 10;

// Données de démonstration : à remplacer par votre API
const EVENTS = generateAuditEvents(247);

const SORT_VALUE = {
  timestamp: (e) => e.time,
  user: (e) => e.userName,
  action: (e) => ACTIONS[e.actionKey].label,
  resource: (e) => e.resource,
  project: (e) => e.project,
  ip: (e) => e.ip,
  result: (e) => RESULTS[e.result].label,
};

const CSV_COLUMNS = [
  { header: 'Horodatage',  value: (e) => formatTimestamp(e.time) },
  { header: 'Utilisateur', value: (e) => e.userName },
  { header: 'Rôle',        value: (e) => e.userRole },
  { header: 'Action',      value: (e) => ACTIONS[e.actionKey].label },
  { header: 'Ressource',   value: (e) => e.resource },
  { header: 'Projet',      value: (e) => e.project },
  { header: 'Adresse IP',  value: (e) => e.ip },
  { header: 'Résultat',    value: (e) => RESULTS[e.result].label },
];

const AuditLog = () => {
  const [filters, setFilters] = useState({ user: '', action: '', project: '', range: 'week', result: '' });
  const [sort, setSort] = useState({ key: 'timestamp', dir: 'desc' });
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);

  const filtered = useMemo(() => {
    const now = Date.now();
    const span = RANGE_MS[filters.range];
    const get = SORT_VALUE[sort.key];
    const dir = sort.dir === 'asc' ? 1 : -1;

    return EVENTS
      .filter(
        (e) =>
          (!filters.user || e.userId === filters.user) &&
          (!filters.action || e.actionKey === filters.action) &&
          (!filters.project || e.project === filters.project) &&
          (!filters.result || e.result === filters.result) &&
          now - e.time <= span
      )
      .sort((a, b) => {
        const x = get(a);
        const y = get(b);
        const c = typeof x === 'number' ? x - y : String(x).localeCompare(String(y), 'fr', { numeric: true });
        return c * dir;
      });
  }, [filters, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const changeFilters = (patch) => { setFilters((f) => ({ ...f, ...patch })); setPage(1); };
  const changeSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'timestamp' ? 'desc' : 'asc' }));
    setPage(1);
  };

  const exportCsv = () =>
    downloadCsv(`journal-audit-${new Date().toISOString().slice(0, 10)}.csv`, CSV_COLUMNS, filtered);

  return (
    <div className="space-y-5">
      {/* En-tête */}
      <header className="cut-frame flex flex-wrap items-center justify-between gap-4 p-5 [--frame-bg:var(--surface)]">
        <div className="flex items-center gap-4">
          <span className="cut-frame cut-sm grid h-14 w-14 shrink-0 place-items-center text-[var(--accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent-tint)]">
            <ShieldCheck size={28} />
          </span>
          <div>
            <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Journal d'audit</h1>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Registre immuable des actions administratives et sensibles pour la sécurité.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="cut-frame cut-sm inline-flex h-11 items-center gap-2 px-5 text-sm font-medium text-[var(--accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent-tint)] enabled:hover:[--frame-bg:var(--surface-2)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={17} /> Exporter en CSV
        </button>
      </header>

      {/* Filtres + tableau */}
      <section className="cut-open [--frame-bg:var(--surface)]">
        <div className="border-b border-[var(--border)] p-5">
          <AuditFilters filters={filters} onChange={changeFilters} />
        </div>

        <AuditTable rows={rows} sort={sort} onSort={changeSort} onDetail={setDetail} />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-muted)]">
          <p>
            {filtered.length === 0
              ? 'Aucun résultat'
              : `Affichage ${start + 1}–${start + rows.length} sur ${filtered.length} événement${filtered.length > 1 ? 's' : ''}`}
          </p>
          <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />
        </div>
      </section>

      {detail && <AuditDetailModal event={detail} onClose={() => setDetail(null)} />}
    </div>
  );
};

export default AuditLog;
