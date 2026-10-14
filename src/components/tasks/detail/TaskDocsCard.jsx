import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DOCS_ROUTE } from '../../../constants/tasks';
import DetailCard from './DetailCard';
import EndpointChip from './EndpointChip';

const TaskDocsCard = ({ endpoints }) => (
  <DetailCard icon={BookOpen} title="Documentation">
    {endpoints.length === 0 ? (
      <p className="text-sm text-[var(--text-muted)]">Aucun endpoint lié : rien à documenter pour cette tâche.</p>
    ) : (
      <>
        <p className="mb-3 text-sm text-[var(--text-soft)]">
          {endpoints.length > 1 ? 'Endpoints liés' : 'Endpoint lié'}
        </p>
        <ul className="space-y-4">
          {endpoints.map((ep) => (
            <li key={ep.id}>
              <Link
                to={DOCS_ROUTE}
                className="flex items-center justify-between gap-3 border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2.5 hover:border-[var(--accent)]"
              >
                <EndpointChip endpoint={ep} />
                <ExternalLink className="shrink-0 text-[var(--accent)]" size={16} />
              </Link>
              <div className="mt-2.5 flex items-center gap-3 px-1 text-sm" data-tone="accent">
                <div className="doc-progress flex-1" role="progressbar" aria-valuenow={ep.docProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`Documentation ${ep.method} ${ep.path}`}>
                  <span style={{ width: `${ep.docProgress}%` }} />
                </div>
                <span className="w-10 text-right text-[var(--text-soft)]">{ep.docProgress}%</span>
              </div>
            </li>
          ))}
        </ul>
        <Link to={DOCS_ROUTE} className="mt-4 flex items-center justify-end gap-1.5 text-sm text-[var(--accent)] hover:underline">
          Voir la documentation <ArrowRight size={15} />
        </Link>
      </>
    )}
  </DetailCard>
);

export default TaskDocsCard;
