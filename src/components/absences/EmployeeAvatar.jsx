import { getInitials } from '../../utils/tasks';

const SIZES = { sm: 'h-7 w-7 text-[11px]', md: 'h-9 w-9 text-xs', lg: 'h-12 w-12 text-sm' };

const EmployeeAvatar = ({ employee, size = 'md' }) => (
  <span
    className={`grid shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] font-semibold text-[var(--text)] ${SIZES[size]}`}
    aria-hidden="true"
  >
    {getInitials(employee?.label)}
  </span>
);

export default EmployeeAvatar;
