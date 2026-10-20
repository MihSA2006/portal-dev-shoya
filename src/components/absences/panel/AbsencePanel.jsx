import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Panneau latéral droit (déclaration, détail, absences d'un jour).
const AbsencePanel = ({ title, onClose, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    // Un composant enfant (liste ouverte…) peut annuler Échap avec preventDefault().
    const onKey = (e) => e.key === 'Escape' && !e.defaultPrevented && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <aside
      ref={ref}
      tabIndex={-1}
      aria-labelledby="absence-panel-title"
      className="abs-panel sticky top-20 flex h-[calc(100vh-6rem)] min-h-0 w-full flex-col border border-[var(--border-strong)] bg-[var(--surface)] outline-none"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] px-5 py-4">
        <h2 id="absence-panel-title" className="font-display text-lg font-semibold">{title}</h2>
        <button className="icon-btn" type="button" onClick={onClose} aria-label="Fermer le panneau">
          <X size={18} />
        </button>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </aside>
  );
};

export default AbsencePanel;
