import { Link } from 'react-router-dom';
import GithubIcon from '../ui/GithubIcon';
import { currentVersion, getProjectSlug, isConnected } from '../../utils/documentation';
import { formatAgo } from '../../utils/time';
import DocProjectIcon from './DocProjectIcon';

const ENV_LABELS = { local: 'Dev', staging: 'Staging', production: 'Prod' };

const Stat = ({ value, label }) => (
  <div className="px-4 first:pl-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-[var(--border)]">
    <p className="text-lg font-semibold text-[var(--text)]">{value}</p>
    <p className="text-xs text-[var(--text-muted)]">{label}</p>
  </div>
);

const Chip = ({ children }) => (
  <span className="border border-[var(--tone)] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] px-2 py-0.5 text-xs font-medium text-[var(--tone)]">
    {children}
  </span>
);

const DocProjectCard = ({ project, tone }) => {
  const { docs } = project;
  const connected = isConnected(project);
  const envs = Object.keys(ENV_LABELS).filter((key) => project.environments[key]);

  return (
    <article
      data-tone={tone}
      className="doc-card cut-frame group floating relative h-full p-5 transition-transform duration-200 hover:-translate-y-1"
    >
      <Link
        to={`/documentation/${getProjectSlug(project)}`}
        aria-label={`Voir la documentation de ${project.name}`}
        className="absolute inset-0 z-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tone)]"
      >
        <span className="sr-only">Voir la documentation de {project.name}</span>
      </Link>
      <div className="pointer-events-none relative z-10">
        <div className="flex items-start gap-4">
          <DocProjectIcon project={project} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-xl font-semibold transition-colors group-hover:text-[var(--tone)]">{project.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-[var(--text-soft)]">{project.tagline || 'Aucune description.'}</p>
      </div>
          <span className={`flex shrink-0 items-center gap-1.5 text-xs ${connected ? 'text-[var(--text-soft)]' : 'text-[var(--text-muted)]'}`}>
            <GithubIcon size={14} /> {connected ? 'Connecté' : 'Non connecté'}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 truncate text-sm text-[var(--cyan)]">
          <GithubIcon size={18} className="shrink-0 text-[var(--text)]" />
          {project.repo ? (
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="pointer-events-auto truncate underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--tone)]"
              aria-label={`Ouvrir le dépôt GitHub ${project.repo}`}
            >
              {project.repo}
            </a>
          ) : (
            <span>Aucun dépôt</span>
          )}
        </div>

        <div className="mt-5 flex">
          <Stat value={docs.versions.join(', ')} label={docs.versions.length > 1 ? 'Versions API' : 'Version API'} />
          <Stat value={docs.endpoints} label="Endpoints" />
          <Stat value={`${docs.coverage}%`} label="Documentation" />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="doc-progress flex-1" role="progressbar" aria-valuenow={docs.coverage} aria-valuemin={0} aria-valuemax={100} aria-label={`Couverture de ${project.name}`}>
            <span style={{ width: `${docs.coverage}%` }} />
          </div>
          <span className="text-xs font-medium text-[var(--tone)]">{docs.coverage}%</span>
        </div>

        <dl className="mt-5 grid grid-cols-[auto_auto_1fr] gap-x-6 text-xs text-[var(--text-muted)]">
          <div><dt>Version actuelle</dt><dd className="mt-1.5"><Chip>{currentVersion(project)}</Chip></dd></div>
          <div><dt>Dernière synchro</dt><dd className="mt-1.5 text-sm text-[var(--text)]">{formatAgo(docs.syncMinutes)}</dd></div>
          <div><dt>Environnements</dt><dd className="mt-1.5 flex flex-wrap gap-1.5">{envs.map((k) => <Chip key={k}>{ENV_LABELS[k]}</Chip>)}</dd></div>
        </dl>
        </div>
    </article>
  );
};

export default DocProjectCard;
