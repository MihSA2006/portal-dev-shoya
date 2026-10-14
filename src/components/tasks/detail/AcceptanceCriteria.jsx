import { CheckSquare, Plus, Square, Trash2 } from 'lucide-react';

const AcceptanceCriteria = ({ items, editing, onChange }) => {
  const done = items.filter((i) => i.done).length;
  const update = (id, patch) => onChange(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const add = () => onChange([...items, { id: crypto.randomUUID(), text: '', done: false }]);

  return (
    <div>
      <h3 className="font-display text-base font-semibold">
        Critères d'acceptation
        {items.length > 0 && (
          <span className="ml-2 text-sm font-normal text-[var(--text-muted)]">{done}/{items.length}</span>
        )}
      </h3>

      {items.length === 0 && !editing && (
        <p className="mt-3 text-sm text-[var(--text-muted)]">Aucun critère défini.</p>
      )}

      <ul className="mt-3 space-y-2.5">
        {items.map((item) =>
          editing ? (
            <li key={item.id} className="flex items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 shrink-0 accent-[var(--accent)]"
                checked={item.done}
                onChange={(e) => update(item.id, { done: e.target.checked })}
                aria-label="Critère rempli"
              />
              <span className="field !h-9 flex-1">
                <input
                  value={item.text}
                  placeholder="Décrivez le critère"
                  aria-label="Texte du critère"
                  onChange={(e) => update(item.id, { text: e.target.value })}
                />
              </span>
              <button className="icon-btn !h-9 !w-9" type="button" onClick={() => remove(item.id)} aria-label="Supprimer le critère">
                <Trash2 size={16} />
              </button>
            </li>
          ) : (
            <li key={item.id} className="flex items-start gap-3 text-sm">
              {item.done
                ? <CheckSquare className="mt-0.5 shrink-0 text-[var(--accent)]" size={18} aria-label="Rempli" />
                : <Square className="mt-0.5 shrink-0 text-[var(--text-muted)]" size={18} aria-label="Non rempli" />}
              <span className={item.done ? 'text-[var(--text-soft)]' : ''}>{item.text}</span>
            </li>
          ),
        )}
      </ul>

      {editing && (
        <button className="btn btn-outline mt-3 !h-9 text-sm" type="button" onClick={add}>
          <Plus size={16} />
          Ajouter un critère
        </button>
      )}
    </div>
  );
};

export default AcceptanceCriteria;
