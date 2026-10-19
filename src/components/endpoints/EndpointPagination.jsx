import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pageList } from '../../utils/endpointRegistry';
import Dropdown from '../ui/Dropdown';

const PAGE_SIZES = [10, 25, 50];

const EndpointPagination = ({ total, page, pages, pageSize, onPage, onPageSize }) => {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const nav = 'grid h-9 min-w-9 place-items-center border px-2 text-sm transition-colors';

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] px-4 py-4">
      <p className="text-sm text-[var(--text-soft)]">Affichage de {from}-{to} sur {total} endpoints</p>

      <div className="flex flex-wrap items-center gap-4">
        <Dropdown
          value={pageSize}
          onChange={onPageSize}
          options={PAGE_SIZES.map((n) => ({ value: n, label: `${n} par page` }))}
          ariaLabel="Éléments par page"
          className="w-auto"
          triggerClassName="!h-10 !w-auto !gap-1.5 !px-3 text-sm"
        />

        <nav aria-label="Pagination" className="flex items-center gap-1.5">
          <button type="button" onClick={() => onPage(page - 1)} disabled={page <= 1} aria-label="Page précédente" className={`${nav} border-[var(--border-strong)] text-[var(--text-soft)] disabled:opacity-40`}>
            <ChevronLeft size={16} />
          </button>
          {pageList(page, pages).map((p, i) =>
            p === '…' ? (
              <span key={`gap-${i}`} className="px-1 text-[var(--text-muted)]">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPage(p)}
                aria-current={p === page ? 'page' : undefined}
                className={`${nav} ${p === page ? 'border-[var(--accent)] bg-[var(--accent)] font-semibold text-[var(--on-accent)]' : 'border-[var(--border-strong)] text-[var(--text-soft)] hover:text-[var(--text)]'}`}
              >
                {p}
              </button>
            )
          )}
          <button type="button" onClick={() => onPage(page + 1)} disabled={page >= pages} aria-label="Page suivante" className={`${nav} border-[var(--border-strong)] text-[var(--text-soft)] disabled:opacity-40`}>
            <ChevronRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default EndpointPagination;
