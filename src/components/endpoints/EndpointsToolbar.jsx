import { useEffect, useRef } from 'react';
import { LayoutGrid, List, Search, X } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

const SORTS = [
  { value: 'updated', label: 'Mis à jour récemment' },
  { value: 'path', label: 'Chemin (A-Z)' },
  { value: 'project', label: 'Projet' },
];

const MiniSelect = ({ value, onChange, options, label }) => (
  <Dropdown
    value={value}
    onChange={onChange}
    options={options}
    ariaLabel={label}
    className="w-auto"
    triggerClassName="!h-11 !w-auto !gap-1.5 !px-3 text-sm"
  />
);

/** Recherche ("/" pour y accéder), bascule liste/cartes, densité et tri. */
const EndpointsToolbar = ({ query, onQuery, view, onView, density, onDensity, sort, onSort }) => {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const viewBtn = (id, Icon, label) => (
    <button
      type="button"
      onClick={() => onView(id)}
      aria-pressed={view === id}
      aria-label={label}
      title={label}
      className={`grid h-9 w-10 place-items-center transition-colors ${view === id ? 'bg-[var(--accent-tint)] text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="field !h-11 min-w-[240px] flex-1">
        <Search size={18} className="shrink-0 text-[var(--accent)]" />
        <input
          ref={ref}
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Rechercher un endpoint, une URL, une section..."
          aria-label="Rechercher un endpoint"
        />
        {query ? (
          <button type="button" onClick={() => onQuery('')} className="icon-btn !h-7 !w-7" aria-label="Effacer la recherche"><X size={15} /></button>
        ) : (
          <kbd aria-hidden="true" className="border border-[var(--border-strong)] bg-[var(--surface-2)] px-1.5 text-xs text-[var(--text-muted)]">/</kbd>
        )}
      </label>

      <div className="flex gap-1 border border-[var(--border)] bg-[var(--bg-elevated)] p-1" role="group" aria-label="Affichage">
        {viewBtn('list', List, 'Vue liste')}
        {viewBtn('cards', LayoutGrid, 'Vue cartes')}
      </div>

      <MiniSelect label="Densité" value={density} onChange={onDensity} options={[{ value: 'compact', label: 'Compact' }, { value: 'comfortable', label: 'Confortable' }]} />
      <MiniSelect label="Tri" value={sort} onChange={onSort} options={SORTS} />
    </div>
  );
};

export default EndpointsToolbar;
