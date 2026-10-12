import { useState } from 'react';
import { AlertTriangle, Ban, Check, ShieldCheck, UserCheck, X } from 'lucide-react';
import { ROLES } from '../../constants/roles';

/** Right-side panel for a user's role, permissions, and account status. */
export default function UserDetailPanel({ user, onDisable, onReactivate, onCancel }) {
  const role = ROLES[user.role];
  const RoleIcon = role.icon;
  const [confirmed, setConfirmed] = useState(false);
  const inactive = user.status === 'inactive';

  return (
    <aside className="animate-enter space-y-5 xl:sticky xl:top-20 xl:self-start">
      {/* Rôle sélectionné */}
      <section data-tone={role.tone} className="cut-frame [--frame-bg:var(--surface)]">
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="tone-badge grid h-12 w-12 shrink-0 place-items-center">
              <RoleIcon size={22} />
            </span>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Rôle sélectionné</p>
              <h2 className="font-display text-xl font-semibold text-[var(--text)]">{role.label}</h2>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">{role.description}</p>

          <div className="mt-5 border border-[var(--border)] bg-[var(--bg-elevated)] p-4">
            <h3 className="flex items-center gap-2.5 font-display text-base font-semibold text-[var(--text)]">
              <ShieldCheck size={20} className="text-[var(--accent)]" /> Permissions
            </h3>
            <ul className="mt-4 space-y-3">
              {role.permissions.map((p) => (
                <li key={p.label} className="flex items-center gap-3 text-sm text-[var(--text-soft)]">
                  {p.allowed ? (
                    <span className="grid h-6 w-6 shrink-0 place-items-center border border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]">
                      <Check size={14} />
                    </span>
                  ) : (
                    <span data-tone="danger" className="tone-badge grid h-6 w-6 shrink-0 place-items-center">
                      <X size={14} />
                    </span>
                  )}
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Compte déjà désactivé → réactivation */}
      {inactive ? (
        <section className="cut-frame [--frame-bg:var(--surface)]">
          <div className="p-5">
            <h2 className="font-display text-lg font-semibold text-[var(--text)]">Compte désactivé</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Cet utilisateur ne peut plus accéder au système. Ses données sont conservées.
            </p>
            <button
              type="button"
              onClick={() => onReactivate(user.id)}
              className="cut-frame cut-sm mt-4 inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold text-[var(--on-accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] hover:[--frame-bg:var(--accent-strong)]"
            >
              <UserCheck size={16} /> Réactiver le compte
            </button>
          </div>
        </section>
      ) : (
        /* Désactiver le compte (volontairement sans icône de fermeture) */
        <section
          id="disable-account-card"
          className="cut-frame [--frame-border:var(--danger)] [--frame-bg:color-mix(in_srgb,var(--danger)_7%,var(--surface))]"
        >
          <div className="p-5">
            <div className="flex items-center gap-3 text-[var(--danger)]">
              <AlertTriangle size={22} />
              <h2 className="font-display text-lg font-semibold">Désactiver le compte</h2>
            </div>

            <p className="mt-4 text-sm font-medium text-[var(--text)]">Voulez-vous vraiment désactiver ce compte ?</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              L'utilisateur ne pourra plus accéder au système, mais ses données seront conservées.
            </p>

            <div className="mt-4 flex items-center gap-3 border border-[var(--border)] bg-[var(--bg-elevated)] p-3">
              <img src="/profile.png" alt="" className="h-11 w-11 shrink-0 border-radius-full border-[var(--border-strong)] object-cover" />
              <div className="min-w-0 text-sm">
                <p className="truncate font-medium text-[var(--text)]">{user.name}</p>
                <p className="truncate text-xs text-[var(--text-muted)]">@{user.username}</p>
                <p className="truncate text-xs text-[var(--text-soft)]">{user.email}</p>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-3 text-sm text-[var(--text-soft)]">
              <input type="checkbox" className="peer sr-only" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
              <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border border-[var(--border-strong)] text-white peer-checked:border-[var(--danger)] peer-checked:bg-[var(--danger)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)] [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                <Check size={13} strokeWidth={3} />
              </span>
              Je comprends les conséquences
            </label>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="h-11 border border-[var(--border-strong)] text-sm font-medium text-[var(--text-soft)] transition-colors hover:border-[var(--text-soft)] hover:text-[var(--text)]"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={!confirmed}
                onClick={() => onDisable(user.id)}
                className="flex h-11 items-center justify-center gap-2 border border-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] text-sm font-medium text-[var(--danger)] transition-colors hover:bg-[var(--danger)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] disabled:hover:text-[var(--danger)]"
              >
                <Ban size={16} /> Désactiver
              </button>
            </div>
          </div>
        </section>
      )}
    </aside>
  );
}
