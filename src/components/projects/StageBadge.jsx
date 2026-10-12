import { STAGES } from '../../constants/projects.js';

const StageBadge = ({ stage }) => {
  const { label, tone } = STAGES[stage];
  return (
    <span data-tone={tone} className="tone-badge inline-block px-1.5 py-0.5 text-[11px] font-medium">
      {label}
    </span>
  );
};

export default StageBadge;
