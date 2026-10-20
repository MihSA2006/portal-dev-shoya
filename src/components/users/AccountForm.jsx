import { useState } from 'react';
import Dropdown from '../ui/Dropdown';
import { ROLE_OPTIONS } from '../../constants/roles';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
];

const EMPTY = { name: '', username: '', githubUsername: '', email: '', role: 'developer', twoFactor: true, status: 'active' };

const inputCls = (error) =>
  `h-11 w-full border bg-[var(--bg-elevated)] px-3.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${
    error ? 'border-[var(--danger)]' : 'border-[var(--border-strong)]'
  }`;

function Field({ label, htmlFor, error, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-[var(--text-soft)]">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[var(--danger)]">{error}</p>}
    </div>
  );
}

/** Formulaire partagé par NewAccountModal et UpdateAccountModal. */
export default function AccountForm({ initial, showStatus = false, submitLabel, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});

  const set = (key) => (value) => setValues((s) => ({ ...s, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = 'Le nom complet est requis.';
    if (!/^[a-z0-9._-]{3,}$/i.test(values.username.trim())) {
      next.username = '3 caractères minimum (lettres, chiffres, . _ -).';
    }
    if (values.githubUsername.trim() && !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(values.githubUsername.trim())) {
      next.githubUsername = 'Saisissez un nom d’utilisateur GitHub valide.';
    }
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = 'Saisissez une adresse e-mail valide.';
    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({
      ...values,
      name: values.name.trim(),
      username: values.username.trim().toLowerCase(),
      githubUsername: values.githubUsername.trim(),
      email: values.email.trim().toLowerCase(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4 px-6 py-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom complet" htmlFor="acc-name" error={errors.name}>
            <input id="acc-name" value={values.name} onChange={(e) => set('name')(e.target.value)} placeholder="Ex. Sarah Ralison" className={inputCls(errors.name)} />
          </Field>
          <Field label="Identifiant" htmlFor="acc-username" error={errors.username}>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">@</span>
              <input id="acc-username" value={values.username} onChange={(e) => set('username')(e.target.value)} placeholder="sarah" className={`${inputCls(errors.username)} pl-8`} />
            </div>
          </Field>
        </div>

        <Field label="Nom d’utilisateur GitHub" htmlFor="acc-github" error={errors.githubUsername}>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">@</span>
            <input
              id="acc-github"
              value={values.githubUsername}
              onChange={(e) => set('githubUsername')(e.target.value)}
              placeholder="sarah"
              autoComplete="off"
              className={`${inputCls(errors.githubUsername)} pl-8`}
            />
          </div>
        </Field>

        <Field label="Adresse e-mail" htmlFor="acc-email" error={errors.email}>
          <input id="acc-email" type="email" value={values.email} onChange={(e) => set('email')(e.target.value)} placeholder="prenom@shoyalabs.com" className={inputCls(errors.email)} />
        </Field>

        <div className={`grid gap-4 ${showStatus ? 'sm:grid-cols-2' : ''}`}>
          <Field label="Rôle">
            <Dropdown value={values.role} onChange={set('role')} options={ROLE_OPTIONS} ariaLabel="Rôle" />
          </Field>
          {showStatus && (
            <Field label="Statut">
              <Dropdown value={values.status} onChange={set('status')} options={STATUS_OPTIONS} ariaLabel="Statut" />
            </Field>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-[var(--text-soft)]">Authentification à deux facteurs</p>
            <p className="text-xs text-[var(--text-muted)]">Exiger un code TOTP à chaque connexion.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={values.twoFactor}
            aria-label="Authentification à deux facteurs"
            onClick={() => set('twoFactor')(!values.twoFactor)}
            className={`relative h-6 w-11 shrink-0 border transition-colors ${
              values.twoFactor ? 'border-[var(--accent)] bg-[var(--accent-tint)]' : 'border-[var(--border-strong)] bg-[var(--surface-2)]'
            }`}
          >
            <span className={`absolute top-0.5 h-4 w-4 transition-all ${values.twoFactor ? 'left-[1.375rem] bg-[var(--accent)]' : 'left-0.5 bg-[var(--text-muted)]'}`} />
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-[var(--border)] px-6 py-4">
        <button type="button" onClick={onCancel} className="h-10 border border-[var(--border-strong)] px-4 text-sm text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]">
          Annuler
        </button>
        <button type="submit" className="cut-frame cut-sm inline-flex h-10 items-center px-5 text-sm font-semibold text-[var(--on-accent)] hover:text-[var(--on-accent-hover)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] hover:[--frame-bg:var(--accent-strong)]">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
