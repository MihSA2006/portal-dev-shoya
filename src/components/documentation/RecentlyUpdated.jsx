import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { formatAgo } from '../../utils/time';
import DocPanel from './DocPanel';
import DocProjectIcon from './DocProjectIcon';
import MethodBadge from './MethodBadge';
import { getProjectSlug } from '../../utils/documentation';

/** `rows` : [{ ...endpoint, project, tone }] */
const RecentlyUpdated = ({ rows }) => (
  <DocPanel icon={Clock} title="Mis à jour récemment">
    {rows.length === 0 ? (
      <p className="py-8 text-center text-sm text-[var(--text-muted)]">Aucun endpoint ne correspond.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
              <th className="py-2 pr-3 font-medium">Méthode</th>
              <th className="px-3 py-2 font-medium">Endpoint</th>
              <th className="px-3 py-2 font-medium">Projet</th>
              <th className="py-2 pl-3 font-medium">Mise à jour</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)]">
                <td className="py-2.5 pr-3"><MethodBadge method={r.method} /></td>
                <td className="px-3 py-2.5">
                  <Link to={`/documentation/${getProjectSlug(r.project)}`} className="font-medium text-[var(--text)] hover:text-[var(--accent)]">{r.path}</Link>
                </td>
                <td className="px-3 py-2.5" data-tone={r.tone}>
                  <span className="flex items-center gap-2 text-[var(--text-soft)]"><DocProjectIcon project={r.project} /> {r.project.name}</span>
                </td>
                <td className="py-2.5 pl-3 text-[var(--text-muted)]">
                  <span className="flex items-center gap-2">
                    {r.minutes <= 10 && <span className="unread-dot" title="Nouveau" />} {formatAgo(r.minutes)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </DocPanel>
);

export default RecentlyUpdated;
