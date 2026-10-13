import { CalendarDays, CheckCircle2, GitPullRequest, ListChecks, User } from 'lucide-react';
import GithubIcon from '../../ui/GithubIcon';
import { formatAgo } from '../../../utils/time';

const formatDate = (iso) =>
  iso ? new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)) : '—';

const Item = ({ icon: Icon, label, children }) => (
  <div className="flex items-center gap-3">
    <span className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--text-soft)]">
      <Icon size={18} />
    </span>
    <div className="text-sm">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <p className="font-medium text-[var(--text)]">{children}</p>
    </div>
  </div>
);

/** Bandeau de métadonnées : développeur, dernière mise à jour, tâche, PR, dépôt, synchro OpenAPI. */
const EndpointFooter = ({ project, meta }) => {
  const synced = meta.openapiMinutes != null;

  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[var(--border)] pt-5">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Item icon={User} label="Développeur responsable">{meta.developer}</Item>
        <Item icon={CalendarDays} label="Dernière mise à jour">{formatDate(meta.updated)}</Item>
        <Item icon={ListChecks} label="Tâche">{meta.task ?? '—'}</Item>
        <Item icon={GitPullRequest} label="Pull request">
          {meta.pr && project.repo ? (
            <a href={`https://github.com/${project.repo}/pull/${meta.pr.replace('#', '')}`} target="_blank" rel="noreferrer" className="text-[var(--cyan)] hover:underline">
              {meta.pr}
            </a>
          ) : '—'}
        </Item>
        {project.repo && (
          <div className="flex items-center gap-3">
            <GithubIcon size={30} />
            <div className="text-sm">
              <p className="text-xs text-[var(--text-muted)]">GitHub</p>
              <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" className="font-medium text-[var(--cyan)] hover:underline">
                Voir le dépôt →
              </a>
            </div>
          </div>
        )}
      </div>

      <span
        role="status"
        data-tone={synced ? 'accent' : 'muted'}
        className="tone-badge flex h-10 items-center gap-2 px-4 text-xs font-semibold uppercase tracking-wide"
      >
        <CheckCircle2 size={16} />
        {synced ? `OpenAPI synchronisé • ${formatAgo(meta.openapiMinutes)}` : 'OpenAPI non synchronisé'}
      </span>
    </footer>
  );
};

export default EndpointFooter;
