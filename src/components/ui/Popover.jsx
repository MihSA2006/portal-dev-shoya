import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const menuRef = useRef(null);

  useLayoutEffect(() => {
    if (!open) return undefined;

    const reposition = () => {
      const anchor = ref.current?.getBoundingClientRect();
      const menu = menuRef.current;
      if (!anchor || !menu) return;

      const menuHeight = menu.getBoundingClientRect().height;
      const menuWidth = width.includes('w-full')
        ? Math.max(anchor.width, 192)
        : menu.getBoundingClientRect().width;
      const left = align === 'right' ? anchor.right - menuWidth : anchor.left;
      const top = placement === 'top' ? anchor.top - menuHeight - 12 : anchor.bottom + 12;

      menu.style.left = `${Math.max(12, Math.min(left, window.innerWidth - menuWidth - 12))}px`;
      menu.style.top = `${Math.max(12, top)}px`;
      if (width.includes('w-full')) menu.style.width = `${menuWidth}px`;
      menu.style.visibility = 'visible';
    };

    reposition();
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, true);
    return () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);
    };
  }, [open, align, placement, width]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!ref.current?.contains(e.target) && !menuRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <div ref={ref} className={`relative ${className}`}>
        {trigger({ open, toggle: () => setOpen((o) => !o) })}
      </div>
      {open && createPortal(
        <div
          ref={menuRef}
          className={`fixed z-[100] floating max-w-[calc(100vw-1.5rem)] ${width}`}
          style={{ left: 0, top: 0, visibility: 'hidden' }}
        >
          <div className="cut-frame cut-sm anim-pop">{children({ close: () => setOpen(false) })}</div>
        </div>,
        document.body,
      )}
    </>
  );
}
