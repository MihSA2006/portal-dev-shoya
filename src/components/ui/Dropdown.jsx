import { Check, ChevronDown } from 'lucide-react';
import Popover from './Popover';

/**
 * Liste déroulante personnalisée (remplace <select>).
 * options : [{ value, label, icon? }]
 */
export default function Dropdown({ value, onChange, options, ariaLabel, className = 'w-full' }) {
  const current = options.find((o) => o.value === value) ?? options[0];
  const CurrentIcon = current.icon;

  return (
    <Popover
      align="left"
      width="w-full min-w-[12rem]"
      className={className}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className={`cut-frame cut-sm flex h-11 w-full items-center justify-between gap-3 px-4 text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--text)] ${
            open ? '[--frame-border:var(--accent)] text-[var(--text)]' : ''
          }`}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            {CurrentIcon && <CurrentIcon size={16} className="shrink-0 text-[var(--accent)]" />}
            <span className="truncate">{current.label}</span>
          </span>
          <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
    >
      {({ close }) => (
        <ul role="listbox" className="max-h-64 overflow-y-auto py-1">
          {options.map((o) => {
            const selected = o.value === value;
            const Icon = o.icon;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => { onChange(o.value); close(); }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[var(--surface-2)] ${
                    selected ? 'text-[var(--accent)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'
                  }`}
                >
                  {Icon && <Icon size={16} className="shrink-0" />}
                  <span className="flex-1 truncate">{o.label}</span>
                  {selected && <Check size={15} className="shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Popover>
  );
}
