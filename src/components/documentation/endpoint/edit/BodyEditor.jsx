import { useMemo } from 'react';
import { Plus, Trash2, Copy, Braces } from 'lucide-react';
import EditCard from './EditCard';
import EditSwitch from './EditSwitch';
import RowButton from './RowButton';
import { inputCls } from './EditField';
import Dropdown from '../../../ui/Dropdown';
import CodeBlock from '../../../ui/CodeBlock';
import BodyFormatSwitch from '../BodyFormatSwitch';
import MultipartBodyPreview from '../MultipartBodyPreview';
import { TYPE_OPTIONS, withCurrent } from '../../../../constants/endpointEdit';
import { buildBodyExample, newField, uid } from '../../../../utils/endpointDraft';
import { buildBodyExampleText } from '../../../../utils/bodyExamples';

const COLS = 'sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_7.5rem_2.75rem_2.75rem]';

const PLACEHOLDERS = {
  string: 'Ex. ord_12345',
  number: 'Ex. 99.99',
  integer: 'Ex. 42',
  boolean: 'true ou false',
  object: '{"clé": "valeur"}',
  array: '["a", "b"]',
};

export default function BodyEditor({ draft, onChange, issues, showIssues, format, onFormat }) {
  const { fields, hasBody } = draft;

  const update = (id, patch) => onChange({ fields: fields.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  const remove = (id) => onChange({ fields: fields.filter((f) => f.id !== id) });
  const duplicate = (field) => {
    const copy = { ...field, id: uid(), name: field.name ? `${field.name}_copy` : '' };
    const index = fields.findIndex((f) => f.id === field.id);
    onChange({ fields: [...fields.slice(0, index + 1), copy, ...fields.slice(index + 1)] });
  };

  const body = useMemo(
    () => ({ fields: fields.filter((f) => f.name.trim()), example: buildBodyExample(fields) }),
    [fields]
  );
  const preview = buildBodyExampleText(format, body);

  return (
    <EditCard title="Corps de la requête" icon={Braces}>
      <div className="mb-4 flex items-center justify-between gap-4 border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-[var(--text-soft)]">Cet endpoint attend un corps de requête</p>
          <p className="text-xs text-[var(--text-muted)]">Généralement utilisé avec POST, PUT et PATCH.</p>
        </div>
        <EditSwitch
          checked={hasBody}
          label="Corps de requête"
          onChange={(value) => onChange({ hasBody: value, fields: value && fields.length === 0 ? [newField()] : fields })}
        />
      </div>

      {hasBody && (
        <>
          <div className="space-y-3">
            {fields.map((f) => {
              const nameErr = showIssues ? issues[`field:${f.id}:name`] : undefined;
              const exampleErr = showIssues ? issues[`field:${f.id}:example`] : undefined;
              return (
                <div key={f.id} className="space-y-3 border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
                  <div className={`grid gap-3 ${COLS}`}>
                    <div>
                      <input
                        aria-label="Nom du paramètre"
                        aria-invalid={!!nameErr}
                        value={f.name}
                        onChange={(e) => update(f.id, { name: e.target.value })}
                        placeholder="order_id"
                        className={`${inputCls(nameErr)} font-mono`}
                      />
                      {nameErr && <p className="mt-1 text-xs text-[var(--danger)]">{nameErr}</p>}
                    </div>
                    <Dropdown value={f.type} onChange={(type) => update(f.id, { type })} options={withCurrent(TYPE_OPTIONS, f.type)} ariaLabel="Type du paramètre" />
                    <div className="flex h-11 items-center gap-2 text-xs text-[var(--text-muted)]">
                      <EditSwitch checked={f.required} onChange={(required) => update(f.id, { required })} label="Requis" />
                      Requis
                    </div>
                    <RowButton tone="accent" label="Dupliquer le paramètre" onClick={() => duplicate(f)}><Copy size={16} /></RowButton>
                    <RowButton label="Supprimer le paramètre" onClick={() => remove(f.id)}><Trash2 size={16} /></RowButton>
                  </div>

                  <div className={`grid gap-3 ${COLS}`}>
                    <input
                      aria-label="Description du paramètre"
                      value={f.description}
                      onChange={(e) => update(f.id, { description: e.target.value })}
                      placeholder="Description"
                      className={inputCls(false)}
                    />
                    <div>
                      <input
                        aria-label="Exemple de valeur"
                        aria-invalid={!!exampleErr}
                        value={f.example}
                        onChange={(e) => update(f.id, { example: e.target.value })}
                        placeholder={PLACEHOLDERS[f.type] ?? 'Exemple'}
                        className={`${inputCls(exampleErr)} font-mono`}
                      />
                      {exampleErr && <p className="mt-1 text-xs text-[var(--danger)]">{exampleErr}</p>}
                    </div>
                  </div>
                </div>
              );
            })}

            {fields.length === 0 && (
              <p className="border border-dashed border-[var(--border-strong)] py-6 text-center text-sm text-[var(--text-muted)]">
                Aucun paramètre défini.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onChange({ fields: [...fields, newField()] })}
            className="mt-4 inline-flex h-10 items-center gap-2 border border-[var(--accent)] bg-[var(--accent-tint)] px-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface-2)]"
          >
            <Plus size={16} /> Ajouter un paramètre
          </button>

          <div className="mt-6">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-[var(--text)]">
                Exemple <span className="font-normal text-[var(--text-muted)]">· généré automatiquement</span>
              </p>
              <BodyFormatSwitch value={format} onChange={onFormat} />
            </div>
            {format === 'form-data' ? (
              <MultipartBodyPreview body={body} />
            ) : preview ? (
              <CodeBlock code={preview} />
            ) : (
              <p className="border border-dashed border-[var(--border-strong)] py-6 text-center text-sm text-[var(--text-muted)]">
                Ajoutez un paramètre pour générer un exemple.
              </p>
            )}
            {format === 'form-data' && (
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                En form-data, les valeurs de type objet ou tableau sont envoyées sous forme de JSON.
              </p>
            )}
          </div>
        </>
      )}
    </EditCard>
  );
}
