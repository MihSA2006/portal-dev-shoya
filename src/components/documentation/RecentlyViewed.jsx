import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { formatAgo } from '../../utils/time';
import { getProjectSlug } from '../../utils/documentation';
import DocPanel from './DocPanel';
import MethodBadge from './MethodBadge';

const RecentlyViewed = ({ rows }) => (
  <DocPanel icon={Eye} title="Consulté récemment">
    {rows.length === 0 ? (
      <p className="py-8 text-center text-sm text-[var(--text-muted)]">Aucune consultation correspondante.</p>
    ) : (
      <ul>
        {rows.map((r) => (
          <li key={r.id} className="border-b border-[var(--border)] last:border-0">
            <Link to={`/documentation/${getProjectSlug(r.project)}`} className="flex items-center gap-4 px-1 py-3 hover:bg-[var(--surface-2)]">
              <MethodBadge method={r.method} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-[var(--text)]">{r.path}</span>
                <span className="text-xs text-[var(--text-muted)]">{r.project.name} • {r.version}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-[var(--text-muted)]">
                <Clock size={14} /> {formatAgo(r.minutes)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </DocPanel>
);

export default RecentlyViewed;
