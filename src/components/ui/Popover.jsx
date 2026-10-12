import { useEffect, useRef, useState } from 'react';

/**
 * Menu déroulant au clic. Se ferme au clic extérieur et avec Échap.
 * <Popover trigger={({ open, toggle }) => <button .../>}>
 *   {({ close }) => <contenu />}
 * </Popover>
 *
 * placement : 'bottom' (défaut) ou 'top'
 * className : classes du conteneur (ex. largeur du déclencheur)
 */
export default function Popover({
  trigger,
  children,
  align = 'right',
  width = 'w-80',
  placement = 'bottom',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          className={`absolute z-50 floating max-w-[calc(100vw-1.5rem)] ${width} ${placement === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'
            } ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          <div className="cut-frame cut-sm anim-pop">{children({ close: () => setOpen(false) })}</div>
        </div>
      )}
    </div>
  );
}
