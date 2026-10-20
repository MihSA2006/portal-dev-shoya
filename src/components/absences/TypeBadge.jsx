import { CircleEllipsis, Clock, HeartPulse, Plane } from 'lucide-react';
import { ABSENCE_TYPES_BY_ID } from '../../constants/absences';

export const TYPE_ICONS = { conge: Plane, maladie: HeartPulse, permission: Clock, autre: CircleEllipsis };

const TypeBadge = ({ type }) => {
  const def = ABSENCE_TYPES_BY_ID[type];
  const Icon = TYPE_ICONS[type] ?? CircleEllipsis;
  return (
    <span className="tone-badge inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs font-medium" data-tone={def?.tone}>
      <Icon size={13} />
      {def?.label}
    </span>
  );
};

export default TypeBadge;
