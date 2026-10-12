import { useState } from 'react';
import { Eye, EyeOff, GitBranch, GitCommit, GitPullRequest, KeyRound, Link2 } from 'lucide-react';
import { BRANCHES } from '../../../constants/projects.js';
import { Field, SelectField, TextField } from '../../ui/Field.jsx';
import CopyButton from '../../ui/CopyButton.jsx';
import GithubIcon from '../../ui/GithubIcon.jsx';

const EVENT_ICONS = { commit: GitCommit, pr: GitPullRequest };

const GithubTab = ({ draft, onChange }) => {
  const [showToken, setShowToken] = useState(false);
  const gh = draft.github;
  const patch = (next) => onChange({ github: { ...gh, ...next } });
  const connected = Boolean(draft.repo && gh.token);
  const webhook = `https://hooks.shoya.io/github/${draft.prefix.toLowerCase() || 'projet'}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center border border-[var(--border-strong)] bg-[var(--surface-2)] text-[var(--text)]">
            <GithubIcon size={22} />
          </span>
          <div>
            <p className="text-sm font-semibold">{connected ? 'Connecté à GitHub' : 'Non connecté'}</p>
            <p className="text-xs text-[var(--text-muted)]">
              {connected ? `${draft.repo} · dernière synchro : ${gh.lastSync}` : 'Renseignez un dépôt et un jeton d\u2019accès.'}
            </p>
          </div>
        </div>
        <span data-tone={connected ? 'accent' : 'admin'} className="tone-badge px-2.5 py-1 text-xs font-medium">
          {connected ? 'Actif' : 'À configurer'}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Dépôt" htmlFor="g-repo">
          <TextField id="g-repo" icon={GithubIcon} value={draft.repo} placeholder="organisation/depot" onChange={(e) => onChange({ repo: e.target.value.trim() })} />
        </Field>
        <Field label="Branche par défaut" htmlFor="g-branch">
          <SelectField id="g-branch" icon={GitBranch} options={BRANCHES} value={draft.branch} onChange={(branch) => onChange({ branch })} />
        </Field>
        <Field label="Jeton d'accès personnel" htmlFor="g-token" hint="Autorisations requises : repo et workflow.">
          <TextField
            id="g-token"
            icon={KeyRound}
            type={showToken ? 'text' : 'password'}
            autoComplete="off"
            value={gh.token}
            placeholder="ghp_..."
            onChange={(e) => patch({ token: e.target.value.trim() })}
            right={
              <button type="button" className="icon-btn !h-8 !w-8" onClick={() => setShowToken((s) => !s)} aria-label={showToken ? 'Masquer le jeton' : 'Afficher le jeton'}>
                {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </Field>
        <Field label="URL du webhook" htmlFor="g-hook" hint="À ajouter dans Settings > Webhooks du dépôt.">
          <TextField id="g-hook" icon={Link2} readOnly value={webhook} right={<CopyButton value={webhook} label="Copier l'URL du webhook" />} />
        </Field>
      </div>

      <section>
        <h3 className="mb-2 text-sm text-[var(--text-soft)]">Activité récente</h3>
        {gh.recent.length === 0 ? (
          <p className="border border-dashed border-[var(--border-strong)] py-8 text-center text-sm text-[var(--text-muted)]">
            Aucune activité GitHub récente.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--bg-elevated)]">
            {gh.recent.map((e, i) => {
              const Icon = EVENT_ICONS[e.type];
              return (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <Icon size={17} className="shrink-0 text-[var(--accent)]" />
                  <span className="min-w-0 flex-1 truncate text-sm text-[var(--text)]">{e.text}</span>
                  <span className="hidden shrink-0 text-xs text-[var(--text-muted)] sm:block">@{e.author} · {e.when}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

    </div>
  );
};

export default GithubTab;
