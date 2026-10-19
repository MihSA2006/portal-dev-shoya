import { Link } from 'react-router-dom';
import { DOC_STATUS, LIFECYCLE } from '../../constants/endpointMeta';
import { formatAgo } from '../../utils/time';
import DocProjectIcon from '../documentation/DocProjectIcon';
import MethodBadge from '../documentation/MethodBadge';
import { Owner } from './EndpointTable';
import StatusPill from './StatusPill';

const EndpointCardGrid = ({ rows }) => (
  <ul className="grid gap-4 p-4 sm:grid-cols-2 2xl:grid-cols-3">
    {rows.map((r) => (
      <li key={r.key}>
        <Link to={r.to} className="block h-full border border-[var(--border)] bg-[var(--bg-elevated)] p-4 transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface-2)]">
          <div className="flex items-center gap-3">
            <MethodBadge method={r.method} />
            <span className="min-w-0 truncate font-mono text-[13px] font-medium">{r.path}</span>
          </div>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{r.description}</p>
          <p data-tone={r.tone} className="mt-3 flex items-center gap-2 text-xs text-[var(--text-soft)]">
            <DocProjectIcon project={r.project} /> {r.project.name} · {r.section} · {r.version}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusPill {...LIFECYCLE[r.lifecycle]} />
            <StatusPill {...DOC_STATUS[r.doc]} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-muted)]">
            <Owner handle={r.owner} />
            <span>{formatAgo(r.minutes)}</span>
          </div>
        </Link>
      </li>
    ))}
  </ul>
);

export default EndpointCardGrid;
