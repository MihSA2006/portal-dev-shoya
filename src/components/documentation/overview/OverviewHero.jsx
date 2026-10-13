import { ENVIRONMENTS } from '../../../constants/projects';
import { currentVersion, isConnected } from '../../../utils/documentation';
import { formatAgo } from '../../../utils/time';
import CopyButton from '../../ui/CopyButton';
import GithubIcon from '../../ui/GithubIcon';
import DocProjectIcon from '../DocProjectIcon';

const OverviewHero = ({ project, env, onEnv, baseUrl, deployMinutes }) => {
  const connected = isConnected(project);

  return (
    <div className="floating">
      <section data-tone="accent" className="overview-hero cut-frame p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-start gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <DocProjectIcon project={project} size="lg" />
              <h1 className="font-display text-4xl font-semibold">{project.name}</h1>
              <span className="border border-[var(--border-strong)] bg-[var(--accent-tint)] px-3 py-1 text-sm font-medium text-[var(--accent)]">
                {currentVersion(project)}
              </span>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--text-soft)]">
              {project.tagline || 'Aucune description pour ce projet.'}
            </p>

            <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
              <GithubIcon size={30} />
              <div className="text-sm">
                <p data-tone={connected ? 'accent' : 'admin'} className="flex items-center gap-2 font-medium text-[var(--tone)]">
                  {connected ? 'Dépôt synchronisé' : 'Dépôt non connecté'}
                  <span className="h-2 w-2 rounded-full bg-[var(--tone)]" />
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {connected ? `Dernier déploiement : ${formatAgo(deployMinutes).toLowerCase()}` : 'Configurez GitHub dans Administration > Projets.'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm text-[var(--text-soft)]" id="env-label">Environnement</p>
              <div role="radiogroup" aria-labelledby="env-label" className="grid grid-cols-3 gap-2">
                {ENVIRONMENTS.map(({ key, label }) => {
                  const on = key === env;
                  const missing = !project.environments[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      disabled={missing}
                      title={missing ? 'URL non configurée' : undefined}
                      onClick={() => onEnv(key)}
                      className={`h-10 border text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${on
                          ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)] shadow-[0_0_14px_var(--accent-glow)]'
                          : 'border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-soft)] hover:text-[var(--text)]'
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="base-url" className="mb-2 block text-sm text-[var(--text-soft)]">URL de base</label>
              <div className="field !h-11">
                <input id="base-url" readOnly value={baseUrl || 'URL non configurée'} className="text-[var(--cyan)]" />
                {baseUrl && <CopyButton value={baseUrl} label="Copier l'URL de base" />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OverviewHero;
