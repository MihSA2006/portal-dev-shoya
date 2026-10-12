import { useState } from 'react';
import { Plus, X } from 'lucide-react';

/** Liste de tags modifiable (stack technique). */
const TagEditor = ({ tags, onChange, placeholder }) => {
  const [value, setValue] = useState('');

  const add = () => {
    const tag = value.trim();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setValue('');
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1.5 border border-[var(--border-strong)] bg-[var(--accent-tint)] py-1 pl-2.5 pr-1 text-xs font-medium text-[var(--accent)]">
            {tag}
            <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))} aria-label={`Retirer ${tag}`} className="grid h-5 w-5 place-items-center hover:bg-[var(--surface-2)]">
              <X size={13} />
            </button>
          </span>
        ))}
        {tags.length === 0 && <span className="text-xs text-[var(--text-muted)]">Aucune technologie ajoutée.</span>}
      </div>
      <div className="flex gap-2">
        <div className="field flex-1">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
            placeholder={placeholder}
            aria-label={placeholder}
          />
        </div>
        <button type="button" onClick={add} className="btn btn-outline"><Plus size={16} /> Ajouter</button>
      </div>
    </div>
  );
};

export default TagEditor;
