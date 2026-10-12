import { ROLES } from '../../constants/roles';

export default function RoleBadge({ role }) {
  const r = ROLES[role];
  if (!r) return null;
  const Icon = r.icon;
  return (
    <span data-tone={r.tone} className="tone-badge inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs font-medium">
      <Icon size={14} />
      {r.label}
    </span>
  );
}
