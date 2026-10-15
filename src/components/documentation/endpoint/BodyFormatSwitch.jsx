import { BODY_FORMATS } from '../../../constants/endpointEdit';

/** Bascule application/json ↔ multipart/form-data (exemple du corps + exemples de code). */
const BodyFormatSwitch = ({ value, onChange }) => (
  <div role="tablist" aria-label="Format du corps de la requête" className="inline-flex gap-1 border border-[var(--border)] bg-[var(--bg-elevated)] p-1">
    {BODY_FORMATS.map((f) => {
      const on = f.id === value;
      return (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={on}
          onClick={() => onChange(f.id)}
          className={`h-8 px-3 text-xs font-medium transition-colors ${
            on
              ? 'bg-[var(--accent-tint)] text-[var(--accent)] shadow-[inset_0_0_0_1px_var(--accent)]'
              : 'text-[var(--text-soft)] hover:text-[var(--text)]'
          }`}
        >
          {f.label}
        </button>
      );
    })}
  </div>
);

export default BodyFormatSwitch;
