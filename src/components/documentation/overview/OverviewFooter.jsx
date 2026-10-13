import { HEALTH_STATUS, OVERALL_LABEL } from '../../../constants/overview';
import DocProjectIcon from '../DocProjectIcon';

const OverviewFooter = ({ project, status }) => (
  <footer data-tone="accent" className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
    <span className="flex items-center gap-3 font-display text-sm font-semibold">
      <DocProjectIcon project={project} /> {project.name}
    </span>
    <span data-tone={HEALTH_STATUS[status].tone} className="flex items-center gap-2 text-sm text-[var(--text-soft)]" role="status">
      <span className="h-2 w-2 rounded-full bg-[var(--tone)] shadow-[0_0_8px_var(--tone)]" /> {OVERALL_LABEL[status]}
    </span>
  </footer>
);

export default OverviewFooter;
