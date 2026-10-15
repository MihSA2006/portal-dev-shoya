import { Info } from 'lucide-react';
import EditCard from './EditCard';
import EditField, { inputCls } from './EditField';
import Dropdown from '../../../ui/Dropdown';
import { METHOD_TONES } from '../../../../constants/documentation';
import { METHOD_OPTIONS, STATUS_OPTIONS, VERSION_OPTIONS, withCurrent } from '../../../../constants/endpointEdit';

export default function BasicInfoEditor({ draft, onChange, issues, showIssues, baseUrl }) {
  const err = (key) => (showIssues ? issues[key] : undefined);

  return (
    <EditCard title="Informations de base" icon={Info}>
      <div className="grid gap-4 md:grid-cols-6">
        <EditField className="md:col-span-4" label="Titre" htmlFor="ep-name" required error={err('name')}>
          <input
            id="ep-name"
            value={draft.name}
            onChange={(e) => onChange({ name: e.target.value })}
            aria-invalid={!!err('name')}
            placeholder="Ex. Créer un paiement"
            className={inputCls(err('name'))}
          />
        </EditField>

        <EditField className="md:col-span-2" label="Méthode HTTP" required>
          <div data-tone={METHOD_TONES[draft.method]} className="[--frame-border:var(--tone)]">
            <Dropdown value={draft.method} onChange={(method) => onChange({ method })} options={METHOD_OPTIONS} ariaLabel="Méthode HTTP" />
          </div>
        </EditField>

        <EditField
          className="md:col-span-6"
          label="Chemin"
          htmlFor="ep-path"
          required
          error={err('path')}
          hint={baseUrl ? `URL complète : ${baseUrl}${draft.path}` : undefined}
        >
          <input
            id="ep-path"
            value={draft.path}
            onChange={(e) => onChange({ path: e.target.value })}
            aria-invalid={!!err('path')}
            placeholder="/api/v1/payments"
            className={`${inputCls(err('path'))} font-mono`}
          />
        </EditField>

        <EditField className="md:col-span-3" label="Statut">
          <Dropdown value={draft.status} onChange={(status) => onChange({ status })} options={STATUS_OPTIONS} ariaLabel="Statut" />
        </EditField>

        <EditField className="md:col-span-3" label="Version de l'API" required>
          <Dropdown
            value={draft.version}
            onChange={(version) => onChange({ version })}
            options={withCurrent(VERSION_OPTIONS, draft.version)}
            ariaLabel="Version de l'API"
          />
        </EditField>
      </div>
    </EditCard>
  );
}
