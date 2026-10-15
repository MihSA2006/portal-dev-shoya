import { Inbox, Plus, Trash2, AlignLeft } from 'lucide-react';
import EditCard from './EditCard';
import EditField, { inputCls } from './EditField';
import RowButton from './RowButton';
import Dropdown from '../../../ui/Dropdown';
import { RESPONSE_STATUS_OPTIONS, withCurrent } from '../../../../constants/endpointEdit';

export default function ResponseEditor({ draft, onChange, issues, showIssues }) {
  const exampleErr = showIssues ? issues.responseExample : undefined;

  const formatJson = () => {
    try {
      onChange({ responseExample: JSON.stringify(JSON.parse(draft.responseExample), null, 2) });
    } catch { /* JSON invalide : l'erreur est affichée à l'enregistrement */ }
  };

  const updateNote = (index, value) => onChange({ notes: draft.notes.map((n, i) => (i === index ? value : n)) });
  const removeNote = (index) => onChange({ notes: draft.notes.filter((_, i) => i !== index) });

  return (
    <EditCard title="Réponse" icon={Inbox}>
      <div className="space-y-4">
        <EditField label="Code de statut">
          <Dropdown
            value={draft.responseStatus}
            onChange={(responseStatus) => onChange({ responseStatus })}
            options={withCurrent(RESPONSE_STATUS_OPTIONS, draft.responseStatus)}
            ariaLabel="Code de statut de la réponse"
          />
        </EditField>

        <EditField
          label="Exemple (JSON)"
          htmlFor="ep-response"
          error={exampleErr}
          aside={
            <button
              type="button"
              onClick={formatJson}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline"
            >
              <AlignLeft size={13} /> Formater
            </button>
          }
        >
          <textarea
            id="ep-response"
            value={draft.responseExample}
            onChange={(e) => onChange({ responseExample: e.target.value })}
            aria-invalid={!!exampleErr}
            rows={9}
            spellCheck={false}
            placeholder={'{\n  "id": "pay_123"\n}'}
            className={`${inputCls(exampleErr, '')} resize-y py-3 font-mono text-[13px] leading-6`}
          />
        </EditField>

        <div>
          <p className="mb-1.5 text-sm font-medium text-[var(--text-soft)]">Notes</p>
          <div className="space-y-2">
            {draft.notes.map((note, i) => (
              <div key={i} className="flex gap-3">
                <input
                  aria-label={`Note ${i + 1}`}
                  value={note}
                  onChange={(e) => updateNote(i, e.target.value)}
                  placeholder="Remarque sur la réponse"
                  className={inputCls(false)}
                />
                <RowButton label="Supprimer la note" onClick={() => removeNote(i)}><Trash2 size={16} /></RowButton>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onChange({ notes: [...draft.notes, ''] })}
            className="mt-3 inline-flex h-9 items-center gap-2 border border-[var(--border-strong)] px-3 text-xs font-medium text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Plus size={14} /> Ajouter une note
          </button>
        </div>
      </div>
    </EditCard>
  );
}
