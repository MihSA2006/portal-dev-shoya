import { METHOD_TONES } from '../../../constants/tasks';

const EndpointChip = ({ endpoint }) => (
  <span
    className="tone-badge inline-flex max-w-full items-center gap-1.5 px-2.5 py-1 font-mono text-xs"
    data-tone={METHOD_TONES[endpoint.method] ?? 'muted'}
  >
    <b>{endpoint.method}</b>
    <span className="truncate">{endpoint.path}</span>
  </span>
);

export default EndpointChip;
