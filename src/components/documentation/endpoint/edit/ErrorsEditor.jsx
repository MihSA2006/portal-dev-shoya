import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import EditCard from './EditCard';
import RowButton from './RowButton';
import { inputCls } from './EditField';
import { newError } from '../../../../utils/endpointDraft';

const COLS = 'grid-cols-[4.5rem_minmax(0,1fr)_2.75rem]';

export default function ErrorsEditor({ draft, onChange, issues, showIssues }) {
  const list = draft.errorList;
  const update = (id, patch) => onChange({ errorList: list.map((e) => (e.id === id ? { ...e, ...patch } : e)) });
  const remove = (id) => onChange({ errorList: list.filter((e) => e.id !== id) });

  return (
    <EditCard title="Erreurs" icon={AlertTriangle}>
      {list.length === 0 ? (
        <p className="border border-dashed border-[var(--border-strong)] py-6 text-center text-sm text-[var(--text-muted)]">
          Aucune erreur documentée.
        </p>
      ) : (
        <div className="space-y-3">
          {list.map((e) => {
            const codeErr = showIssues ? issues[`error:${e.id}:code`] : undefined;
            const titleErr = showIssues ? issues[`error:${e.id}:title`] : undefined;
            return (
              <div key={e.id} className="space-y-3 border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
                <div className={`grid gap-3 ${COLS}`}>
                  <input
                    aria-label="Code HTTP"
                    aria-invalid={!!codeErr}
                    inputMode="numeric"
                    maxLength={3}
                    value={e.code}
                    onChange={(ev) => update(e.id, { code: ev.target.value.replace(/\D/g, '') })}
                    placeholder="400"
                    className={`${inputCls(codeErr)} px-2 text-center font-semibold`}
                  />
                  <input
                    aria-label="Titre de l'erreur"
                    aria-invalid={!!titleErr}
                    value={e.title}
                    onChange={(ev) => update(e.id, { title: ev.target.value })}
                    placeholder="Requête invalide"
                    className={inputCls(titleErr)}
                  />
                  <RowButton label="Supprimer l'erreur" onClick={() => remove(e.id)}><Trash2 size={16} /></RowButton>
                </div>
                {(codeErr || titleErr) && (
                  <p className="text-xs text-[var(--danger)]">{codeErr ?? titleErr}</p>
                )}
                <input
                  aria-label="Description de l'erreur"
                  value={e.description}
                  onChange={(ev) => update(e.id, { description: ev.target.value })}
                  placeholder="Description"
                  className={inputCls(false)}
                />
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => onChange({ errorList: [...list, newError()] })}
        className="mt-4 inline-flex h-10 items-center gap-2 border border-[var(--accent)] bg-[var(--accent-tint)] px-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface-2)]"
      >
        <Plus size={16} /> Ajouter une erreur
      </button>
    </EditCard>
  );
}
