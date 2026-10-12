import { useMemo, useState } from 'react';
import { Search, UserPlus, Pencil, Trash2 } from 'lucide-react';

// Static data: replace with your API
const USERS = [
  { id: 1, name: 'Fanomezantsoa Mickael', email: 'f.mickael@shoyadev.io',  role: 'Développeur',    status: 'active',   lastLogin: "Aujourd'hui, 09:12" },
  { id: 2, name: 'Hanitra Rakoto',        email: 'h.rakoto@shoyadev.io',   role: 'Administrateur', status: 'active',   lastLogin: "Aujourd'hui, 08:40" },
  { id: 3, name: 'Tiana Andrianina',      email: 't.andrianina@shoyadev.io', role: 'Chef de projet', status: 'active', lastLogin: 'Hier, 17:55' },
  { id: 4, name: 'Mirana Razafy',         email: 'm.razafy@shoyadev.io',   role: 'Développeur',    status: 'invited',  lastLogin: 'Jamais' },
  { id: 5, name: 'Lova Randria',          email: 'l.randria@shoyadev.io',  role: 'Développeur',    status: 'inactive', lastLogin: 'Il y a 3 semaines' },
];

const ROLES = ['Administrateur', 'Chef de projet', 'Développeur'];

const STATUS = {
  active:   { label: 'Actif',   cls: 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]' },
  invited:  { label: 'Invité',  cls: 'border-[var(--cyan)] bg-[var(--cyan-soft)] text-[var(--cyan)]' },
  inactive: { label: 'Inactif', cls: 'border-[var(--border-strong)] text-[var(--text-muted)]' },
};

const initials = (name) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

const Users = () => {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('');

  const users = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USERS.filter(
      (u) => (!role || u.role === role) && (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    );
  }, [query, role]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Utilisateurs</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Gérez les membres de votre organisation, leurs rôles et leur statut.
          </p>
        </div>
        <button
          type="button"
          className="cut-frame cut-sm inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold text-[var(--on-accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] hover:[--frame-bg:var(--accent-strong)]"
        >
          <UserPlus size={17} /> Inviter un utilisateur
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <label className="cut-frame cut-sm flex h-10 min-w-[240px] flex-1 items-center gap-3 px-3.5 sm:max-w-md focus-within:[--frame-border:var(--accent)]">
          <Search size={17} className="text-[var(--accent)]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par nom ou e-mail..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
          />
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          aria-label="Filtrer par rôle"
          className="h-10 border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-sm text-[var(--text-soft)] outline-none focus:border-[var(--accent)]"
        >
          <option value="">Tous les rôles</option>
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Table */}
      <section className="cut-frame [--frame-bg:var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
                <th className="px-5 py-3 font-medium">Utilisateur</th>
                <th className="px-5 py-3 font-medium">Rôle</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Dernière connexion</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface-2)] transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] font-display text-xs font-semibold text-[var(--accent)]">
                        {initials(u.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-[var(--text)]">{u.name}</p>
                        <p className="truncate text-xs text-[var(--text-muted)]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-soft)]">{u.role}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block border px-2 py-0.5 text-xs font-medium ${STATUS[u.status].cls}`}>
                      {STATUS[u.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">{u.lastLogin}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button className="icon-btn" aria-label={`Modifier ${u.name}`} title="Modifier"><Pencil size={17} /></button>
                      <button className="icon-btn" aria-label={`Supprimer ${u.name}`} title="Supprimer"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-[var(--text-muted)]">
            Aucun utilisateur ne correspond à votre recherche.
          </p>
        )}
      </section>
    </div>
  );
};

export default Users;
