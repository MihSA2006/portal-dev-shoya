import { METHOD_TONES } from '../../constants/documentation';

const MethodBadge = ({ method }) => (
  <span data-tone={METHOD_TONES[method] ?? 'accent'} className="tone-badge inline-block min-w-[3.75rem] px-2 py-1 text-center text-xs font-semibold">
    {method}
  </span>
);

export default MethodBadge;
