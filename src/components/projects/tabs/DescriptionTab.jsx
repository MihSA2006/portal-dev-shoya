import { Field } from '../../ui/Field.jsx';
import TagEditor from '../TagEditor.jsx';

const MAX_DETAILS = 600;

const DescriptionTab = ({ draft, onChange }) => {
  const { details, stack } = draft.description;
  const patch = (next) => onChange({ description: { ...draft.description, ...next } });

  return (
    <div className="space-y-6">
      <Field label="Description courte" htmlFor="d-tagline" hint="Affichée sous le nom du projet.">
        <div className="field">
          <input id="d-tagline" value={draft.tagline} maxLength={90} onChange={(e) => onChange({ tagline: e.target.value })} />
        </div>
      </Field>

      <Field label="Description détaillée" htmlFor="d-details">
        <div className="field !h-auto items-start py-2.5">
          <textarea
            id="d-details"
            rows={5}
            value={details}
            maxLength={MAX_DETAILS}
            onChange={(e) => patch({ details: e.target.value })}
            className="resize-none leading-relaxed"
            placeholder="À quoi sert ce projet, et pour qui ?"
          />
        </div>
        <p className="mt-1.5 text-right text-xs text-[var(--text-muted)]">{details.length}/{MAX_DETAILS}</p>
      </Field>

      <Field label="Stack technique">
        <TagEditor tags={stack} onChange={(next) => patch({ stack: next })} placeholder="Ex. : Redis" />
      </Field>
    </div>
  );
};

export default DescriptionTab;
