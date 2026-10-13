import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

/** Ctrl+L (ou Cmd+L) place le focus dans la recherche de documentation. */
const DocsSearch = ({ value, onChange }) => {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, []);

  return (
    <label className="field !h-12">
      <Search size={18} className="shrink-0 text-[var(--accent)]" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un projet ou un endpoint..."
        aria-label="Rechercher dans la documentation"
      />
      <span className="hidden shrink-0 items-center gap-1 text-xs text-[var(--text-muted)] sm:flex" aria-hidden="true">
        <kbd className="border border-[var(--border-strong)] bg-[var(--surface-2)] px-1.5 py-0.5">Ctrl</kbd>
        <kbd className="border border-[var(--border-strong)] bg-[var(--surface-2)] px-1.5 py-0.5">L</kbd>
      </span>
    </label>
  );
};

export default DocsSearch;
