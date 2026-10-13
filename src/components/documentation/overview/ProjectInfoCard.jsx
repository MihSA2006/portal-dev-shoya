import { Clock, ExternalLink, GitBranch, GitPullRequest, Layers, Tag } from 'lucide-react';
import { currentVersion } from '../../../utils/documentation';
import { formatAgo } from '../../../utils/time';
import GithubIcon from '../../ui/GithubIcon';
import OverviewCard from './OverviewCard';

const Row = ({ icon: Icon, label, action, children }) => (
  <div className="flex items-center gap-4 border-t border-[var(--border)] py-3 first:border-0 first:pt-0">
    <Icon size={22} className="shrink-0 text-[var(--text-soft)]" />
    <div className="min-w-0 flex-1">
      <p className="text-xs text-[var(--text-muted)]">{label}</p>
      <div className="truncate text-sm font-medium text-[var(--text)]">{children}</div>
    </div>
    {action}
  </div>
);

const ProjectInfoCard = ({ project, overview }) => (
  <OverviewCard icon={Layers} title="Informations du projet">
    <Row
      icon={GithubIcon}
      label="Dépôt"
      action={project.repo && (
        <a href={`https://github.com/${project.repo}`} target="_blank" rel="noreferrer" className="icon-btn !h-8 !w-8" aria-label="Ouvrir le dépôt sur GitHub">
          <ExternalLink size={16} />
        </a>
      )}
    >
      {project.repo || 'Non défini'}
    </Row>
    <Row icon={GitBranch} label="Branche courante">{project.branch}</Row>
    <Row icon={Clock} label="Dernier déploiement">
      <span className="flex items-center gap-2">
        {formatAgo(overview.deployMinutes)}
        {overview.deployMinutes != null && <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />}
      </span>
    </Row>
    <Row
      icon={GitPullRequest}
      label="Pull requests ouvertes"
      action={project.repo && (
        <a href={`https://github.com/${project.repo}/pulls`} target="_blank" rel="noreferrer" className="text-xs text-[var(--cyan)] hover:underline">
          Tout voir →
        </a>
      )}
    >
      {overview.openPRs}
    </Row>
    <Row icon={Tag} label="Version de l'API">{currentVersion(project)}</Row>
  </OverviewCard>
);

export default ProjectInfoCard;
