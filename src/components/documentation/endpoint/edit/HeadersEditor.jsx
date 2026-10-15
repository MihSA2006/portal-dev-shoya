import { Plus, Trash2, Table2 } from 'lucide-react';
import EditCard from './EditCard';
import EditSwitch from './EditSwitch';
import RowButton from './RowButton';
import { inputCls } from './EditField';
import Dropdown from '../../../ui/Dropdown';
import { TYPE_OPTIONS, withCurrent } from '../../../../constants/endpointEdit';
import { newHeader } from '../../../../utils/endpointDraft';

const COLS = 'sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_7.5rem_2.75rem]';

export default function HeadersEditor({ headers, onChange, issues, showIssues }) {
  const update = (id, patch) => onChange(headers.map((h) => (h.id === id ? { ...h, ...patch } : h)));
  const remove = (id) => onChange(headers.filter((h) => h.id !== id));

  return (
    <EditCard title="En-têtes" icon={Table2}>
      {headers.length === 0 ? (
        <p className="border border-dashed border-[var(--border-strong)] py-6 text-center text-sm text-[var(--text-muted)]">
          Aucun en-tête défini.
        </p>
      ) : (
        <div className="space-y-3">
          <div className={`hidden gap-3 text-xs text-[var(--text-muted)] sm:grid ${COLS}`}>
            <span>Nom</span><span>Type</span><span>Requis</span><span />
          </div>

          {headers.map((h) => {
            const err = showIssues ? issues[`header:${h.id}`] : undefined;
            return (
              <div key={h.id}>
                <div className={`grid gap-3 ${COLS}`}>
                  <input
                    aria-label="Nom de l'en-tête"
                    aria-invalid={!!err}
                    value={h.name}
                    onChange={(e) => update(h.id, { name: e.target.value })}
                    placeholder="Ex. Authorization"
                    className={inputCls(err)}
                  />
                  <Dropdown value={h.type} onChange={(type) => update(h.id, { type })} options={withCurrent(TYPE_OPTIONS, h.type)} ariaLabel="Type de l'en-tête" />
                  <div className="flex h-11 items-center gap-2 text-xs text-[var(--text-muted)]">
                    <EditSwitch checked={h.required} onChange={(required) => update(h.id, { required })} label="Requis" />
                    Requis
                  </div>
                  <RowButton label="Supprimer l'en-tête" onClick={() => remove(h.id)}><Trash2 size={16} /></RowButton>
                </div>
                {err && <p className="mt-1 text-xs text-[var(--danger)]">{err}</p>}
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => onChange([...headers, newHeader()])}
        className="mt-4 inline-flex h-10 items-center gap-2 border border-[var(--accent)] bg-[var(--accent-tint)] px-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface-2)]"
      >
        <Plus size={16} /> Ajouter un en-tête
      </button>
    </EditCard>
  );
}
