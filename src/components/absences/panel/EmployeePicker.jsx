import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import EmployeeAvatar from '../EmployeeAvatar';

// Liste déroulante avec recherche (clavier : ↑ ↓ Entrée Échap).
const EmployeePicker = ({ id, value, employees, onChange, invalid }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const selected = employees.find((e) => e.id === value);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? employees.filter((e) => e.label.toLowerCase().includes(q)) : employees;
  }, [employees, query]);

  const choose = (employee) => {
    onChange(employee.id);
    setQuery('');
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape' && open) {
      e.preventDefault(); // ne ferme que la liste, pas le panneau
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <span className={`field ${invalid ? '!border-[var(--danger)]' : ''}`}>
        <Search className="shrink-0 text-[var(--text-muted)]" size={16} />
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          aria-invalid={invalid}
          autoComplete="off"
          value={open ? query : selected?.label ?? ''}
          placeholder="Rechercher un collaborateur…"
          onFocus={() => {
            setOpen(true);
            setActive(0);
          }}
          onBlur={() => {
            setOpen(false);
            setQuery('');
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
        />
      </span>

      {open && (
        <ul id={`${id}-list`} role="listbox" className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto border border-[var(--border-strong)] bg-[var(--surface)] shadow-lg">
          {results.length === 0 && <li className="px-3 py-2 text-sm text-[var(--text-muted)]">Aucun collaborateur trouvé.</li>}
          {results.map((employee, i) => (
            <li key={employee.id} role="option" aria-selected={employee.id === value}>
              <button
                type="button"
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm ${i === active ? 'bg-[var(--accent-tint)]' : ''}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(employee)}
              >
                <EmployeeAvatar employee={employee} size="sm" />
                <span className="flex-1 truncate">{employee.label}</span>
                <span className="text-xs text-[var(--text-muted)]">{employee.role}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeePicker;
