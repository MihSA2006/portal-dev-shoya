import { ArrowUpRight, Cloud, Code2, GitBranch, Laptop, Server, User } from 'lucide-react';
import { BRANCHES, ENVIRONMENTS, OWNERS } from '../../../constants/projects.js';
import { Field, SelectField, TextField } from '../../ui/Field.jsx';
import CopyButton from '../../ui/CopyButton.jsx';
import GithubIcon from '../../ui/GithubIcon.jsx';

const ENV_ICONS = { laptop: Laptop, server: Server, cloud: Cloud };

const GeneralTab = ({ draft, onChange }) => (
  <div className="space-y-6">
    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Nom du projet" htmlFor="p-name">
        <TextField id="p-name" value={draft.name} onChange={(e) => onChange({ name: e.target.value })} />
      </Field>
      <Field label="Préfixe des tâches" htmlFor="p-prefix">
        <TextField id="p-prefix" value={draft.prefix} maxLength={6} onChange={(e) => onChange({ prefix: e.target.value.toUpperCase() })} />
      </Field>

      <Field label="Dépôt GitHub" htmlFor="p-repo">
        <TextField
          id="p-repo"
          icon={GithubIcon}
          value={draft.repo}
          placeholder="organisation/depot"
          onChange={(e) => onChange({ repo: e.target.value.trim() })}
          right={draft.repo && (
            <a href={`https://github.com/${draft.repo}`} target="_blank" rel="noreferrer" className="icon-btn !h-8 !w-8" aria-label="Ouvrir le dépôt sur GitHub">
              <ArrowUpRight size={16} />
            </a>
          )}
        />
      </Field>
      <Field label="Branche par défaut" htmlFor="p-branch">
        <SelectField id="p-branch" icon={GitBranch} options={BRANCHES} value={draft.branch} onChange={(branch) => onChange({ branch })} />
      </Field>
    </div>

    <fieldset>
      <legend className="mb-2 text-sm text-[var(--text-soft)]">Environnements</legend>
      <div className="divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--bg-elevated)]">
        {ENVIRONMENTS.map(({ key, label, icon, tone }) => {
          const Icon = ENV_ICONS[icon];
          return (
            <div key={key} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
              <span className="flex w-28 shrink-0 items-center gap-3 text-sm text-[var(--text-soft)]">
                <Icon size={22} className="text-[var(--accent)]" /> {label}
              </span>
              <TextField
                className="min-w-0 flex-1"
                aria-label={`URL ${label}`}
                value={draft.environments[key]}
                placeholder="https://"
                onChange={(e) => onChange({ environments: { ...draft.environments, [key]: e.target.value.trim() } })}
                right={<CopyButton value={draft.environments[key]} label={`Copier l'URL ${label}`} />}
              />
              <span data-tone={tone} className="tone-badge inline-flex w-28 items-center gap-2 px-2.5 py-1.5 text-xs font-medium">
                <span className="h-2 w-2 rounded-full bg-[var(--tone)]" /> {label}
              </span>
            </div>
          );
        })}
      </div>
    </fieldset>

    <div className="grid gap-5 md:grid-cols-2">
      <Field label="Version actuelle de l'API" htmlFor="p-api">
        <TextField id="p-api" icon={Code2} value={draft.apiVersion} onChange={(e) => onChange({ apiVersion: e.target.value.trim() })} />
      </Field>
      <Field label="Responsable de la documentation" htmlFor="p-owner">
        <SelectField id="p-owner" icon={User} options={OWNERS} value={draft.docOwner} onChange={(docOwner) => onChange({ docOwner })} />
      </Field>
    </div>
  </div>
);

export default GeneralTab;
