import { Pencil, RotateCcw } from 'lucide-react';
import { ENVIRONMENTS } from '../../../constants/projects';
import { METHOD_TONES } from '../../../constants/documentation';
import { STATUS_META } from '../../../constants/endpointEdit';
import EditActions from './edit/EditActions';

const ENV_TONES = { local: 'muted', staging: 'cyan', production: 'accent' };

/** Fil d'Ariane, méthode, titre, sélecteur d'environnement et actions d'édition. */
const EndpointHeader = ({
  project, endpoint, env, onEnv,
  editing = false, dirty = false, saved = false, hasOverride = false,
  onEdit, onCancel, onSave, onRestore,
}) => {
  const available = ENVIRONMENTS.filter(({ key }) => project.environments[key]);
  const status = STATUS_META[endpoint.status];
  const title = endpoint.name || 'Sans titre';

  return (
    <header className="space-y-4">
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <span>{endpoint.category.name}</span>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--text-soft)]" aria-current={editing ? undefined : 'page'}>{title}</span>
        {editing && (
          <>
            <span aria-hidden="true">›</span>
            <span className="text-[var(--accent)]" aria-current="page">Modification</span>
          </>
        )}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span data-tone={METHOD_TONES[endpoint.method]} className="tone-badge px-5 py-2.5 font-display text-base font-bold">
            {endpoint.method}
          </span>
          <h1 className="truncate font-display text-3xl font-semibold">{title}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {saved && (
            <span role="status" className="text-xs font-medium text-[var(--accent)]">Modifications enregistrées</span>
          )}

          {!editing && status && (
            <span data-tone={status.tone} className="tone-badge px-2.5 py-1 text-xs font-medium">{status.label}</span>
          )}
          {!editing && endpoint.version && (
            <span className="border border-[var(--border-strong)] bg-[var(--surface-2)] px-2.5 py-1 text-xs text-[var(--text-soft)]">
              {endpoint.version}
            </span>
          )}

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

          {editing ? (
            <EditActions dirty={dirty} onCancel={onCancel} onSave={onSave} />
          ) : (
            <>
              {hasOverride && (
                <button
                  type="button"
                  onClick={onRestore}
                  className="icon-btn"
                  title="Restaurer la version d'origine"
                  aria-label="Restaurer la version d'origine"
                >
                  <RotateCcw size={17} />
                </button>
              )}
              <button
                type="button"
                onClick={onEdit}
                className="inline-flex h-9 items-center gap-2 border border-[var(--accent)] bg-[var(--accent-tint)] px-4 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface-2)]"
              >
                <Pencil size={15} /> Modifier
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default EndpointHeader;
