import { ENVIRONMENTS } from '../../../constants/projects';
import { METHOD_TONES } from '../../../constants/documentation';

const ENV_TONES = { local: 'muted', staging: 'cyan', production: 'accent' };

/** Fil d'Ariane, méthode, titre et sélecteur d'environnement. */
const EndpointHeader = ({ project, endpoint, env, onEnv }) => {
  const available = ENVIRONMENTS.filter(({ key }) => project.environments[key]);

  return (
    <header className="space-y-4">
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <span>{endpoint.category.name}</span>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--text-soft)]" aria-current="page">{endpoint.name}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span data-tone={METHOD_TONES[endpoint.method]} className="tone-badge px-5 py-2.5 font-display text-base font-bold">
            {endpoint.method}
          </span>
          <h1 className="truncate font-display text-3xl font-semibold">{endpoint.name}</h1>
        </div>

        <label data-tone={ENV_TONES[env]} className="tone-badge relative flex h-9 items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wide">
          <span className="h-2 w-2 rounded-full bg-[var(--tone)]" />
          <span className="sr-only">Environnement</span>
          <select
            value={env}
            onChange={(e) => onEnv(e.target.value)}
            className="cursor-pointer appearance-none bg-transparent pr-1 font-semibold uppercase outline-none"
          >
            {available.map(({ key, label }) => (
              <option key={key} value={key} className="normal-case" style={{ background: 'var(--surface)', color: 'var(--text)' }}>{label}</option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
};

export default EndpointHeader;
