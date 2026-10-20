import { Check, Clock, X } from 'lucide-react';
import { ABSENCE_STATUSES_BY_ID } from '../../constants/absences';

const ICONS = { pending: Clock, approved: Check, rejected: X };

const StatusBadge = ({ status }) => {
  const def = ABSENCE_STATUSES_BY_ID[status];
  const Icon = ICONS[status] ?? Clock;
  return (
    <span className="tone-badge inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs font-medium" data-tone={def?.tone}>
      <Icon size={13} />
      {def?.label}
    </span>
  );
};

export default StatusBadge;
