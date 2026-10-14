import { ExternalLink, FileText, GitPullRequest, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DOCS_ROUTE } from '../../../constants/tasks';
import DetailCard from './DetailCard';

const cls = 'btn btn-outline !h-10 w-full justify-start text-sm font-medium';

const Action = ({ icon: Icon, label, href, to }) => {
  const content = (<><Icon size={16} />{label}</>);
  if (to) return <Link className={cls} to={to}>{content}</Link>;
  if (href) return <a className={cls} href={href} target="_blank" rel="noreferrer">{content}</a>;
  return <button className={cls} type="button" disabled>{content}</button>;
};

const QuickActionsCard = ({ github, hasEndpoints }) => {
  const repoUrl = github ? `https://github.com/${github.repo}` : null;
  return (
    <DetailCard icon={Zap} title="Actions rapides">
      <div className="space-y-2.5">
        <Action icon={GitPullRequest} label="Voir la pull request"
          href={github?.pr ? `${repoUrl}/pull/${github.pr.number}` : null} />
        <Action icon={ExternalLink} label="Ouvrir le dépôt" href={repoUrl} />
        <Action icon={FileText} label="Voir la documentation" to={hasEndpoints ? DOCS_ROUTE : null} />
      </div>
    </DetailCard>
  );
};

export default QuickActionsCard;
