import { useMemo, useState } from 'react';
import { ClipboardList, Search } from 'lucide-react';

const AUDIT_LOG = [
  { id: 1, actor: 'Hanitra Rakoto', action: 'A ajouté un utilisateur', target: 'Mirana Razafy', category: 'users', date: "Aujourd'hui, 09:14", ip: '192.168.1.24' },
  { id: 2, actor: 'Tiana Andrianina', action: 'A modifié un projet', target: 'Portail Shoya', category: 'projects', date: "Aujourd'hui, 08:52", ip: '192.168.1.31' },
  { id: 3, actor: 'Fanomezantsoa Mickael', action: 'A modifié un seuil d’alerte', target: 'Dépassement du budget', category: 'alerts', date: 'Hier, 16:37', ip: '192.168.1.18' },
  { id: 4, actor: 'Hanitra Rakoto', action: 'A changé les permissions', target: 'Rôle Développeur', category: 'users', date: 'Hier, 14:05', ip: '192.168.1.24' },
  { id: 5, actor: 'Tiana Andrianina', action: 'A archivé un projet', target: 'Espace client', category: 'projects', date: '10 oct. 2026, 11:22', ip: '192.168.1.31' },
];

const CATEGORIES = {
  users: 'Utilisateurs',
  projects: 'Projets',
  alerts: 'Alertes',
};

const AuditLog = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AUDIT_LOG.filter((entry) =>
      (!category || entry.category === category)
      && (!q || entry.actor.toLowerCase().includes(q)
        || entry.action.toLowerCase().includes(q)
        || entry.target.toLowerCase().includes(q)
        || entry.ip.includes(q))
    );
  }, [query, category]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold">Journal d’audit</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Consultez l’historique des actions effectuées dans votre organisation.
        </p>
      </header>

      <div className="flex flex-wrap gap-3">
        <label className="cut-frame cut-sm flex h-10 min-w-[240px] flex-1 items-center gap-3 px-3.5 sm:max-w-md focus-within:[--frame-border:var(--accent)]">
          <Search size={17} className="text-[var(--accent)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher par utilisateur, action, cible ou adresse IP..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filtrer par catégorie"
          className="h-10 border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-sm text-[var(--text-soft)] outline-none focus:border-[var(--accent)]"
        >
          <option value="">Toutes les catégories</option>
          {Object.entries(CATEGORIES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <section className="cut-frame [--frame-bg:var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
                <th className="px-5 py-3 font-medium">Utilisateur</th>
                <th className="px-5 py-3 font-medium">Action</th>
                <th className="px-5 py-3 font-medium">Cible</th>
                <th className="px-5 py-3 font-medium">Catégorie</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Adresse IP</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-3 font-medium text-[var(--text)]">{entry.actor}</td>
                  <td className="px-5 py-3 text-[var(--text-soft)]">{entry.action}</td>
                  <td className="px-5 py-3 text-[var(--text-soft)]">{entry.target}</td>
                  <td className="px-5 py-3">
                    <span className="inline-block border border-[var(--border-strong)] px-2 py-0.5 text-xs font-medium text-[var(--text-muted)]">
                      {CATEGORIES[entry.category]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">{entry.date}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[var(--text-muted)]">{entry.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {entries.length === 0 && (
          <div className="flex flex-col items-center px-5 py-10 text-center">
            <ClipboardList className="mb-3 text-[var(--text-muted)]" size={26} strokeWidth={1.5} />
            <p className="text-sm text-[var(--text-muted)]">Aucune action ne correspond à votre recherche.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AuditLog;
