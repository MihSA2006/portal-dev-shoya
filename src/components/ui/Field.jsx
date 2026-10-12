import Dropdown from './Dropdown.jsx';

/** Libellé + contrôle. */
export const Field = ({ label, htmlFor, hint, children, className = '' }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-2 block text-sm text-[var(--text-soft)]">{label}</label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-[var(--text-muted)]">{hint}</p>}
  </div>
);

/** Champ texte avec addon (icône) à gauche et slot libre à droite. */
export const TextField = ({ icon: Icon, right, className = '', ...props }) => (
  <div className={`field ${className}`}>
    {Icon && <span className="field-addon"><Icon size={17} /></span>}
    <input {...props} />
    {right && <span className="pr-1.5">{right}</span>}
  </div>
);

export const SelectField = ({ icon: Icon, options, className = '', ...props }) => (
  <Dropdown
    {...props}
    options={options.map((option) => ({ value: option, label: option }))}
    ariaLabel={props['aria-label'] ?? props.id}
    className={className || 'w-full'}
    icon={Icon}
  />
);
