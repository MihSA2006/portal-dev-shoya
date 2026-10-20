import { useEffect, useRef, useState } from 'react';
import { CalendarRange, ChevronDown, Download, FileSpreadsheet, Filter, ListChecks } from 'lucide-react';

const OPTIONS = [
  { id: 'all', label: 'Toutes les demandes', icon: ListChecks },
  { id: 'filtered', label: 'Résultats filtrés', icon: Filter },
  { id: 'calendar', label: 'Absences du calendrier', icon: FileSpreadsheet },
];

const ExportMenu = ({ onExport, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = () => {
      setOpen(false);
      setRangeOpen(false);
    };
    const onDown = (e) => !ref.current?.contains(e.target) && close();
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const run = (kind, range) => {
    onExport(kind, range);
    setOpen(false);
    setRangeOpen(false);
  };

  const item = 'flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-[var(--accent-tint)]';

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button className="btn btn-outline" type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Download size={17} />
        Exporter (CSV)
        <ChevronDown size={15} />
      </button>

      {open && (
        <div className="anim-pop absolute right-0 z-30 mt-2 w-72 border border-[var(--border-strong)] bg-[var(--surface)] shadow-lg" role="menu">
          {OPTIONS.map(({ id, label, icon: Icon }) => (
            <button key={id} className={item} type="button" role="menuitem" onClick={() => run(id)}>
              <Icon className="text-[var(--accent)]" size={16} />
              {label}
            </button>
          ))}
          <button className={item} type="button" role="menuitem" aria-expanded={rangeOpen} onClick={() => setRangeOpen((v) => !v)}>
            <CalendarRange className="text-[var(--accent)]" size={16} />
            Choisir une période
          </button>

          {rangeOpen && (
            <div className="space-y-3 border-t border-[var(--border)] p-3">
              <label className="block text-xs text-[var(--text-soft)]">
                Du
                <span className="field mt-1 !h-9"><input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></span>
              </label>
              <label className="block text-xs text-[var(--text-soft)]">
                Au
                <span className="field mt-1 !h-9"><input type="date" value={to} min={from || undefined} onChange={(e) => setTo(e.target.value)} /></span>
              </label>
              <button className="btn btn-primary !h-9 w-full text-sm" type="button" disabled={!from || !to || from > to}
                onClick={() => run('range', { from, to })}>
                Exporter la période
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
