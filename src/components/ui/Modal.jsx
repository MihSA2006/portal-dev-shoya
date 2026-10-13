import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ title, description, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="animate-enter fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/65 p-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="floating w-full max-w-lg">
        <div className="cut-frame [--frame-bg:var(--surface)]">
          <div className="max-h-[calc(100vh-3rem)] overflow-y-auto">
            <header className="flex items-start justify-between gap-4 border-b border-[var(--border)] px-6 py-5">
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--text)]">{title}</h2>
                {description && <p className="mt-1 text-sm text-[var(--text-muted)]">{description}</p>}
              </div>
              <button type="button" className="icon-btn -mr-2 -mt-2" onClick={onClose} aria-label="Fermer">
                <X size={20} />
              </button>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
