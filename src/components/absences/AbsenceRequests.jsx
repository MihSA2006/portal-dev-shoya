import ExportMenu from './ExportMenu';
import RequestsFilters from './RequestsFilters';
import RequestsTable from './RequestsTable';

const AbsenceRequests = ({ rows, filters, onFilter, onReset, onExport, onOpen, onApprove, onReject }) => (
  <section className="cut-frame min-w-0 [--frame-bg:var(--surface)]" aria-labelledby="requests-title">
    <div className="space-y-4 border-b border-[var(--border)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="requests-title" className="font-display text-xl font-semibold">Demandes d'absence</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Consultez les demandes soumises et suivez leur validation.</p>
        </div>
        <ExportMenu onExport={onExport} />
      </div>
      <RequestsFilters filters={filters} onChange={onFilter} onReset={onReset} />
    </div>
    <RequestsTable rows={rows} resetKey={JSON.stringify(filters)} onOpen={onOpen} onApprove={onApprove} onReject={onReject} />
  </section>
);

export default AbsenceRequests;
