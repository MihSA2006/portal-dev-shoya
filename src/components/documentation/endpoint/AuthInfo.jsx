import { ShieldCheck } from 'lucide-react';

const Cell = ({ label, value }) => (
  <div className="flex flex-1 items-center gap-4 px-5 py-4">
    <ShieldCheck size={26} className="shrink-0 text-[var(--accent)]" />
    <div className="min-w-0">
      <p className="text-sm text-[var(--text-soft)]">{label}</p>
      <p className="truncate text-sm font-medium text-[var(--text)]">{value}</p>
    </div>
  </div>
);

const AuthInfo = ({ auth, permission }) => (
  <div className="flex flex-col divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--bg-elevated)] sm:flex-row sm:divide-x sm:divide-y-0">
    <Cell label="Authentification" value={auth} />
    <Cell label="Permission" value={permission} />
  </div>
);

export default AuthInfo;
