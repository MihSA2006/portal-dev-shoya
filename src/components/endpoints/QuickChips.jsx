import { CHIPS, activeChip } from '../../utils/endpointRegistry';

const QuickChips = ({ count, filters, onChange }) => {
  const active = activeChip(filters);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <p className="mr-2 text-sm text-[var(--text-soft)]" role="status">
        {count} endpoint{count > 1 ? 's' : ''} trouvé{count > 1 ? 's' : ''}
      </p>
      {CHIPS.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onChange(chip.patch)}
          aria-pressed={active === chip.id}
          className={`border px-3 py-1 text-xs font-medium transition-colors ${
            active === chip.id
              ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
              : 'border-[var(--border-strong)] text-[var(--text-soft)] hover:text-[var(--text)]'
          }`}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
};

export default QuickChips;
