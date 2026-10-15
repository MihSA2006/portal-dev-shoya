import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

/** Arbre du schéma de corps de requête (objet plat). */
const SchemaTree = ({ fields }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-elevated)] p-4 text-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex items-center gap-1.5 text-[var(--text)]">
        {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        object <span className="text-[var(--text-muted)]">{`{${fields.length}}`}</span>
      </button>
      {open && (
        <ul className="ml-2 mt-2 space-y-2.5 border-l border-[var(--border-strong)] pl-0">
          {fields.map((f) => (
            <li key={f.name} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-3 shrink-0 bg-[var(--border-strong)]" />
              <span className="font-medium text-[var(--text)]">{f.name}</span>
              <span className="text-xs text-[var(--text-muted)]">{f.type}</span>
              {f.required && <span className="text-xs text-[var(--text-muted)]">(requis)</span>}
              {f.description && (
                <span className="min-w-0 truncate text-xs text-[var(--text-muted)]" title={f.description}>— {f.description}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchemaTree;
