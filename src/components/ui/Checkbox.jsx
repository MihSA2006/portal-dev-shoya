import { Check } from 'lucide-react';

export default function Checkbox({ checked, onChange, disabled = false, children }) {
  return (
    <label
      className={`flex items-center gap-3 text-sm text-[var(--text-soft)] ${
        disabled ? 'cursor-not-allowed opacity-45' : 'cursor-pointer hover:text-[var(--text)]'
      }`}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border border-[var(--border-strong)] text-[var(--on-accent)] peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)] [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <Check size={13} strokeWidth={3} />
      </span>
      {children}
    </label>
  );
}
