import { useMemo, useState } from 'react';
import { Search, UserPlus, UserRound, Users as UsersIcon, ChevronLeft, ChevronRight, Fingerprint } from 'lucide-react';
import Dropdown from '../../components/ui/Dropdown';
import UserRow from '../../components/users/UserRow';
import UserDetailPanel from '../../components/users/UserDetailPanel';
import NewAccountModal from '../../components/users/NewAccountModal';
import UpdateAccountModal from '../../components/users/UpdateAccountModal';
import { ROLES, ROLE_OPTIONS } from '../../constants/roles';
import { AdminUsersSkeleton } from '../../components/ui/LoadingSkeleton';
import useInitialSkeleton from '../../hooks/useInitialSkeleton';

const PAGE_SIZE = 8;

// Données statiques : à remplacer par votre API
const INITIAL_USERS = [
  { id: 1, name: 'Admin', username: 'mickael', githubUsername: 'mickael', email: 'mickael@shoyalabs.com', role: 'admin', projects: 5, twoFactor: true, status: 'active', lastActivity: 'Maintenant', device: 'Windows • WSL' },
  { id: 2, name: 'Sarah Ralison', username: 'sarah', githubUsername: 'sarah-ralison', email: 'sarah@shoyalabs.com', role: 'lead', projects: 4, twoFactor: true, status: 'active', lastActivity: 'Il y a 2 h', device: 'Windows • Chrome' },
  { id: 3, name: 'Thomas Andrian', username: 'thomas', githubUsername: 'thomas-andrian', email: 'thomas@shoyalabs.com', role: 'developer', projects: 3, twoFactor: true, status: 'active', lastActivity: 'Il y a 5 h', device: 'Linux • Firefox' },
  { id: 4, name: 'Rindra Zo', username: 'rindra', githubUsername: 'rindra-zo', email: 'rindra@shoyalabs.com', role: 'developer', projects: 2, twoFactor: true, status: 'active', lastActivity: 'Il y a 7 h', device: 'Windows • Edge' },
  { id: 5, name: 'Lalana Miora', username: 'lalana', githubUsername: 'lalana-miora', email: 'lalana@shoyalabs.com', role: 'doc', projects: 3, twoFactor: true, status: 'active', lastActivity: 'Il y a 1 j', device: 'Linux • Firefox' },
  { id: 6, name: 'Tiana Rakoto', username: 'tiana', githubUsername: 'tiana-rakoto', email: 'tiana@shoyalabs.com', role: 'developer', projects: 2, twoFactor: true, status: 'active', lastActivity: 'Il y a 1 j', device: 'MacOS • Safari' },
  { id: 7, name: 'Fanja Andry', username: 'fanja', githubUsername: 'fanja-andry', email: 'fanja@shoyalabs.com', role: 'lead', projects: 4, twoFactor: true, status: 'active', lastActivity: 'Il y a 2 j', device: 'Windows • Chrome' },
  { id: 8, name: 'Njara Rasoanaivo', username: 'njara', githubUsername: 'njara-rasoanaivo', email: 'njara@shoyalabs.com', role: 'developer', projects: 1, twoFactor: false, status: 'active', lastActivity: 'Il y a 3 j', device: 'Linux • Firefox' },
];

const ROLE_FILTER = [{ value: '', label: 'Tous les rôles' }, ...ROLE_OPTIONS];
const STATUS_FILTER = [
  { value: '', label: 'Tous les statuts' },
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
];

const Users = () => {
  const loading = useInitialSkeleton();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [modal, setModal] = useState(null); // { type: 'new' } | { type: 'edit', id }

  const selected = users.find((u) => u.id === selectedId) ?? null;
  const editing = modal?.type === 'edit' ? users.find((u) => u.id === modal.id) : null;

  /* ───── Filtres + pagination ───── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) =>
        (!roleFilter || u.role === roleFilter) &&
        (!statusFilter || u.status === statusFilter) &&
        (!q || [u.name, u.username, u.githubUsername, u.email].some((s) => s?.toLowerCase().includes(q)))
    );
  }, [users, query, roleFilter, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const withReset = (setter) => (value) => { setter(value); setPage(1); };

  /* ───── Statistiques ───── */
  const stats = useMemo(() => {
    const counts = {};
    users.forEach((u) => { counts[u.role] = (counts[u.role] || 0) + 1; });
    return [
      { label: 'Total utilisateurs', value: users.length, icon: UsersIcon, tone: 'accent' },
      ...Object.entries(ROLES).map(([key, r]) => ({ label: r.plural, value: counts[key] || 0, icon: r.icon, tone: r.tone })),
    ];
  }, [users]);

  if (loading) return <AdminUsersSkeleton />;

  /* ───── Actions ───── */
  const toggleSelect = (id) => setSelectedId((cur) => (cur === id ? null : id));
  const goToDisable = (id) => {
    setSelectedId(id);
    setTimeout(() => document.getElementById('disable-account-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  };

  const createUser = (values) =>
    setUsers((list) => [...list, { id: Date.now(), ...values, projects: 0, lastActivity: 'Jamais', device: '—' }]);
  const updateUser = (id, values) => setUsers((list) => list.map((u) => (u.id === id ? { ...u, ...values } : u)));
  const setStatus = (id, status) => updateUser(id, { status });

  return (
    <div className="page-content-enter space-y-5">
      <div className={`grid gap-5 ${selected ? 'xl:grid-cols-[minmax(0,1fr)_21rem]' : ''}`}>
        <section className="cut-frame [--frame-bg:var(--surface)]">
          <div className="space-y-5 p-5">
            {/* En-tête */}
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="cut-frame cut-sm grid h-14 w-14 shrink-0 place-items-center text-[var(--accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent-tint)]">
                  <UserRound size={26} />
                </span>
                <div>
                  <h1 className="font-display text-3xl font-semibold text-[var(--text)]">Utilisateurs</h1>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Gérez les membres de votre équipe, leurs rôles et leurs permissions d'accès.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModal({ type: 'new' })}
                className="cut-frame cut-sm inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold text-[var(--on-accent)] hover:text-[var(--on-accent-hover)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] hover:[--frame-bg:var(--accent-strong)]"
              >
                <UserPlus size={18} /> Nouveau compte
              </button>
            </header>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-5">
              {stats.map(({ label, value, icon: Icon, tone }) => (
                <div key={label} data-tone={tone} className="cut-frame cut-sm [--frame-bg:var(--surface-2)]">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span className="tone-badge grid h-10 w-10 shrink-0 place-items-center">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="font-display text-xl font-semibold text-[var(--text)]">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
              <label className="cut-frame cut-sm flex h-11 min-w-[220px] flex-1 items-center gap-3 px-4">
                <Search size={17} className="text-[var(--accent)]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => withReset(setQuery)(e.target.value)}
                  placeholder="Rechercher un utilisateur..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]"
                />
              </label>
              <Dropdown value={roleFilter} onChange={withReset(setRoleFilter)} options={ROLE_FILTER} ariaLabel="Filtrer par rôle" className="w-full sm:w-56" />
              <Dropdown value={statusFilter} onChange={withReset(setStatusFilter)} options={STATUS_FILTER} ariaLabel="Filtrer par statut" className="w-full sm:w-56" />
            </div>

            {/* Tableau */}
            <div className="flex h-[36rem] flex-col overflow-x-auto border border-[var(--border)] bg-[var(--bg-elevated)]">
              <table className="w-full min-w-[820px] flex-none text-left">
                <thead>
                  <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
                    <th className="px-4 py-3.5 font-medium">Utilisateur</th>
                    <th className={`px-4 py-3.5 font-medium ${selected ? 'hidden 2xl:table-cell' : ''}`}>E-mail</th>
                    <th className="px-4 py-3.5 font-medium">Rôle</th>
                    <th className={`px-4 py-3.5 font-medium ${selected ? 'hidden 2xl:table-cell' : ''}`}>Projets</th>
                    <th className="px-4 py-3.5 font-medium">2FA</th>
                    <th className="px-4 py-3.5 font-medium">Statut</th>
                    <th className="px-4 py-3.5 font-medium">Dernière activité</th>
                    <th className="px-4 py-3.5 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((u, i) => (
                    <UserRow
                      key={u.id}
                      user={u}
                      selected={u.id === selectedId}
                      panelOpen={!!selected}
                      dropUp={i >= 3}
                      onToggle={() => toggleSelect(u.id)}
                      onView={() => setSelectedId(u.id)}
                      onEdit={() => setModal({ type: 'edit', id: u.id })}
                      onDisable={() => goToDisable(u.id)}
                    />
                  ))}
                </tbody>
              </table>
              {rows.length === 0 && (
                <p className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">
                  Aucun utilisateur ne correspond à votre recherche.
                </p>
              )}
              {rows.length > 0 && <div className="min-h-0 flex-1" aria-hidden="true" />}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
              <p>
                {filtered.length === 0
                  ? 'Aucun résultat'
                  : `Affichage ${start + 1}–${start + rows.length} sur ${filtered.length} utilisateur${filtered.length > 1 ? 's' : ''}`}
              </p>
              <div className="flex items-center gap-1.5">
                <button type="button" aria-label="Page précédente" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="grid h-8 w-8 place-items-center border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-inherit">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={n === currentPage ? 'page' : undefined}
                    className={`grid h-8 min-w-8 place-items-center border px-2 text-sm transition-colors ${n === currentPage
                        ? 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]'
                        : 'border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                      }`}
                  >
                    {n}
                  </button>
                ))}
                <button type="button" aria-label="Page suivante" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="grid h-8 w-8 place-items-center border border-[var(--border)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-40 disabled:hover:border-[var(--border)] disabled:hover:text-inherit">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Panneau de droite : uniquement quand un utilisateur est sélectionné */}
        {selected && (
          <UserDetailPanel
            key={selected.id}
            user={selected}
            onDisable={(id) => setStatus(id, 'inactive')}
            onReactivate={(id) => setStatus(id, 'active')}
            onCancel={() => setSelectedId(null)}
          />
        )}
      </div>

      {/* Informations du bas */}
      <footer className="cut-frame cut-sm [--frame-bg:var(--surface)]">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-xs">
          <span className="flex items-center gap-3 text-[var(--accent)]">
            <Fingerprint size={18} /> Système de gestion des identités Shoya Labs
          </span>
          <span className="flex items-center gap-2 text-[var(--text-muted)]">
            Personnes <i className="not-italic opacity-50">/</i> Accès <i className="not-italic opacity-50">/</i> Sécurité <i className="not-italic opacity-50">/</i> Croissance
          </span>
        </div>
      </footer>

      {/* Modales */}
      {modal?.type === 'new' && <NewAccountModal onClose={() => setModal(null)} onCreate={createUser} />}
      {editing && (
        <UpdateAccountModal user={editing} onClose={() => setModal(null)} onUpdate={(values) => updateUser(editing.id, values)} />
      )}
    </div>
  );
};

export default Users;
