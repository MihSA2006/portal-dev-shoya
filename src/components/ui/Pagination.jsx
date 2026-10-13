import { ChevronLeft, ChevronRight } from 'lucide-react';

const btn =
  'grid h-8 min-w-8 place-items-center border px-2 text-sm transition-colors disabled:opacity-40';

export default function Pagination({ page, pageCount, onChange, windowSize = 5 }) {
  const size = Math.min(windowSize, pageCount);
  const start = Math.max(1, Math.min(page - Math.floor(windowSize / 2), pageCount - size + 1));
  const pages = Array.from({ length: size }, (_, i) => start + i);

  return (
    <nav className="flex items-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        aria-label="Page précédente"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${btn} border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:hover:border-[var(--border)] disabled:hover:text-inherit`}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`${btn} ${
            n === page
              ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
              : 'border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
          }`}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label="Page suivante"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className={`${btn} border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:hover:border-[var(--border)] disabled:hover:text-inherit`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
