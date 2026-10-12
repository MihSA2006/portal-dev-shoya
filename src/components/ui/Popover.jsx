import { useEffect, useRef, useState } from 'react';

/**
 * Click-triggered dropdown that closes on outside click or Escape.
 * <Popover trigger={({ open, toggle }) => <button .../>}>
 *   {({ close }) => <contenu />}
 * </Popover>
 */
export default function Popover({ trigger, children, align = 'right', width = 'w-80' }) {
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
    <div ref={ref} className="relative">
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          className={`absolute top-full mt-3 z-50 floating max-w-[calc(100vw-1.5rem)] ${width} ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="cut-frame cut-sm anim-pop">{children({ close: () => setOpen(false) })}</div>
        </div>
      )}
    </div>
  );
}
