import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DOC_STATUS, LIFECYCLE } from '../../constants/endpointMeta';
import { ownerName } from '../../utils/endpointRegistry';
import { formatAgo } from '../../utils/time';
import CopyButton from '../ui/CopyButton';
import DocProjectIcon from '../documentation/DocProjectIcon';
import MethodBadge from '../documentation/MethodBadge';
import StatusPill from './StatusPill';

const COLUMNS = ['Méthode', 'Endpoint', 'Projet', 'Section', 'Version', 'Statut', 'Documentation', 'Responsable', 'Mise à jour', 'Actions'];

export const Owner = ({ handle }) => (
  <span className="flex items-center gap-2 whitespace-nowrap">
    <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-xs font-semibold text-[var(--accent)]">
      {ownerName(handle).charAt(0)}
    </span>
    {ownerName(handle)}
  </span>
);

const EndpointTable = ({ rows, density }) => {
  const pad = density === 'compact' ? 'py-2.5' : 'py-4';

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1180px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs text-[var(--text-soft)]">
            {COLUMNS.map((c, i) => (
              <th key={c} className={`px-3 py-3 font-medium ${i === COLUMNS.length - 1 ? 'text-right' : ''}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b border-[var(--border)] transition-colors last:border-0 hover:bg-[var(--surface-2)]">
              <td className={`px-3 ${pad}`}><MethodBadge method={r.method} /></td>
              <td className={`px-3 ${pad}`}>
                <div className="flex items-center gap-1.5">
                  <Link to={r.to} className="font-mono text-[13px] font-medium text-[var(--text)] hover:text-[var(--accent)]">{r.path}</Link>
                  <CopyButton value={r.path} label={`Copier ${r.path}`} />
                </div>
                <p className="text-xs text-[var(--text-muted)]">{r.description}</p>
              </td>
              <td className={`px-3 ${pad}`}>
                <span data-tone={r.tone} className="flex items-center gap-2 whitespace-nowrap text-[var(--text-soft)]">
                  <DocProjectIcon project={r.project} /> {r.project.name}
                </span>
              </td>
              <td className={`px-3 ${pad} text-[var(--text-soft)]`}>{r.section}</td>
              <td className={`px-3 ${pad} text-[var(--text-soft)]`}>{r.version}</td>
              <td className={`px-3 ${pad}`}><StatusPill {...LIFECYCLE[r.lifecycle]} /></td>
              <td className={`px-3 ${pad}`}><StatusPill {...DOC_STATUS[r.doc]} /></td>
              <td className={`px-3 ${pad} text-[var(--text-soft)]`}><Owner handle={r.owner} /></td>
              <td className={`whitespace-nowrap px-3 ${pad} text-[var(--text-muted)]`}>{formatAgo(r.minutes)}</td>
              <td className={`px-3 ${pad}`}>
                <div className="flex justify-end">
                  <Link to={r.to} className="icon-btn" aria-label={`Ouvrir la documentation de ${r.path}`} title="Ouvrir la documentation">
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EndpointTable;
