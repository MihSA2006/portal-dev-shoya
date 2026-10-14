import Dropdown from '../../ui/Dropdown';

const SelectField = ({ id, label, value, onChange, options, className = '' }) => (
  <div className={className}>
    <label className="sr-only" htmlFor={id}>{label}</label>
    <Dropdown
      id={id}
      value={value}
      onChange={onChange}
      options={options.map(({ id: optionId, label: optionLabel }) => ({ value: optionId, label: optionLabel }))}
      ariaLabel={label}
      className={className}
      triggerClassName={className}
    />
  </div>
);

export default SelectField;
