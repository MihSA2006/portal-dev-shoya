import { ShieldCheck, Lock } from 'lucide-react';
import EditCard from './EditCard';
import EditField, { inputCls } from './EditField';
import Dropdown from '../../../ui/Dropdown';
import { AUTH_OPTIONS, withCurrent } from '../../../../constants/endpointEdit';

export default function AuthEditor({ draft, onChange }) {
  return (
    <EditCard title="Authentification" icon={ShieldCheck}>
      <div className="grid gap-4 sm:grid-cols-2">
        <EditField label="Type">
          <Dropdown
            value={draft.auth}
            onChange={(auth) => onChange({ auth })}
            options={withCurrent(AUTH_OPTIONS, draft.auth)}
            ariaLabel="Type d'authentification"
          />
        </EditField>

        <EditField label="Permission" htmlFor="ep-permission">
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              id="ep-permission"
              value={draft.permission}
              onChange={(e) => onChange({ permission: e.target.value })}
              placeholder="payments:create"
              className={`${inputCls(false)} pl-10`}
            />
          </div>
        </EditField>
      </div>
    </EditCard>
  );
}
