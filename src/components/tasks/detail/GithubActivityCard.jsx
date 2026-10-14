import { useState } from 'react';
import { ArrowRight, Check, Clock, Copy, ExternalLink, GitBranch, GitCommitHorizontal, GitPullRequest } from 'lucide-react';
import GithubIcon from '../../ui/GithubIcon';
import { timeAgo } from '../../../utils/tasks';
import DetailCard from './DetailCard';

const PR_STATES = {
  open: { label: 'Ouverte', tone: 'accent' },
  merged: { label: 'Fusionnée', tone: 'doc' },
  closed: { label: 'Fermée', tone: 'danger' },
};

const Row = ({ icon: Icon, label, children }) => (
  <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-3">
    <span className="flex items-center gap-3 text-sm text-[var(--text-soft)]">
      <Icon className="shrink-0" size={20} />
      {label}
    </span>
    <div className="field justify-between">{children}</div>
  </div>
);

const iconLink = 'shrink-0 text-[var(--text-muted)] hover:text-[var(--accent)]';

const GithubActivityCard = ({ github }) => {
  const [copied, setCopied] = useState(false);
  const repoUrl = github ? `https://github.com/${github.repo}` : null;

  const copyBranch = async () => {
    try {
      await navigator.clipboard.writeText(github.branch);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* presse-papiers indisponible : on ignore */
    }
  };

  return (
    <DetailCard
      icon={GithubIcon}
      title="Activité GitHub"
      action={repoUrl && (
        <a className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline" href={repoUrl} target="_blank" rel="noreferrer">
          Voir sur GitHub <ArrowRight size={15} />
        </a>
      )}
    >
      {!github ? (
        <p className="text-sm text-[var(--text-muted)]">
          Aucune activité GitHub. La branche et la pull request apparaîtront ici après la première synchronisation.
        </p>
      ) : (
        <div className="space-y-3">
          <Row icon={GitBranch} label="Branche">
            <span className="truncate text-sm">{github.branch}</span>
            <button className={iconLink} type="button" onClick={copyBranch} aria-label="Copier le nom de la branche">
              {copied ? <Check size={16} className="text-[var(--accent)]" /> : <Copy size={16} />}
            </button>
          </Row>

          <Row icon={GitPullRequest} label="Pull request">
            {github.pr ? (
              <>
                <span className="flex items-center gap-3 text-sm">
                  #{github.pr.number}
                  <span className="tone-badge px-2 py-0.5 text-xs font-semibold" data-tone={PR_STATES[github.pr.state]?.tone}>
                    {PR_STATES[github.pr.state]?.label}
                  </span>
                </span>
                <a className={iconLink} href={`${repoUrl}/pull/${github.pr.number}`} target="_blank" rel="noreferrer" aria-label="Ouvrir la pull request">
                  <ExternalLink size={16} />
                </a>
              </>
            ) : (
              <span className="text-sm text-[var(--text-muted)]">Aucune</span>
            )}
          </Row>

          <Row icon={GitCommitHorizontal} label="Commits">
            <span className="text-sm">{github.commits}</span>
            <a className={iconLink} href={`${repoUrl}/commits/${github.branch}`} target="_blank" rel="noreferrer" aria-label="Voir les commits">
              <ExternalLink size={16} />
            </a>
          </Row>

          <Row icon={Clock} label="Dernière activité">
            <span className="text-sm">{timeAgo(github.lastActivityAt)}</span>
          </Row>
        </div>
      )}
    </DetailCard>
  );
};

export default GithubActivityCard;
