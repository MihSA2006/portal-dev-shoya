import { useMemo, useState } from 'react';
import { BellRing, Pencil, Plus, Search, Trash2 } from 'lucide-react';

const ALERT_THRESHOLDS = [
  { id: 1, name: 'Dépassement du budget', metric: 'Budget consommé', limit: '90 %', scope: 'Tous les projets', status: 'active', updatedAt: '10 oct. 2026' },
  { id: 2, name: 'Retard de livraison', metric: 'Retard estimé', limit: '5 jours', scope: 'Tous les projets', status: 'active', updatedAt: '8 oct. 2026' },
  { id: 3, name: 'Charge de travail élevée', metric: 'Charge par membre', limit: '40 h / semaine', scope: 'Équipe Développement', status: 'inactive', updatedAt: '1 oct. 2026' },
];

const STATUS = {
  active: { label: 'Actif', cls: 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]' },
  inactive: { label: 'Inactif', cls: 'border-[var(--border-strong)] text-[var(--text-muted)]' },
};

const AlertThresholds = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const thresholds = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALERT_THRESHOLDS.filter((threshold) =>
      (!status || threshold.status === status)
      && (!q || threshold.name.toLowerCase().includes(q)
        || threshold.metric.toLowerCase().includes(q)
        || threshold.scope.toLowerCase().includes(q))
    );
  }, [query, status]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Seuils d’alerte</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Configurez les seuils qui déclenchent des alertes pour vos projets et vos équipes.
          </p>
        </div>
        <button
          type="button"
          className="cut-frame cut-sm inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold text-[var(--on-accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] hover:[--frame-bg:var(--accent-strong)]"
        >
          <Plus size={17} /> Ajouter un seuil
        </button>
      </header>

      <div className="flex flex-wrap gap-3">
        <label className="cut-frame cut-sm flex h-10 min-w-[240px] flex-1 items-center gap-3 px-3.5 sm:max-w-md focus-within:[--frame-border:var(--accent)]">
          <Search size={17} className="text-[var(--accent)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher par alerte, indicateur ou périmètre..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filtrer par statut"
          className="h-10 border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-sm text-[var(--text-soft)] outline-none focus:border-[var(--accent)]"
        >
          <option value="">Tous les statuts</option>
          {Object.entries(STATUS).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
        </select>
      </div>

      <section className="cut-frame [--frame-bg:var(--surface)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
                <th className="px-5 py-3 font-medium">Alerte</th>
                <th className="px-5 py-3 font-medium">Indicateur</th>
                <th className="px-5 py-3 font-medium">Seuil</th>
                <th className="px-5 py-3 font-medium">Périmètre</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {thresholds.map((threshold) => (
                <tr key={threshold.id} className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
                        <BellRing size={17} />
                      </span>
                      <div>
                        <p className="font-medium text-[var(--text)]">{threshold.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">Modifié le {threshold.updatedAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-soft)]">{threshold.metric}</td>
                  <td className="px-5 py-3 font-medium text-[var(--text)]">{threshold.limit}</td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">{threshold.scope}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block border px-2 py-0.5 text-xs font-medium ${STATUS[threshold.status].cls}`}>
                      {STATUS[threshold.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button className="icon-btn" aria-label={`Modifier ${threshold.name}`} title="Modifier"><Pencil size={17} /></button>
                      <button className="icon-btn" aria-label={`Supprimer ${threshold.name}`} title="Supprimer"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {thresholds.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-[var(--text-muted)]">
            Aucun seuil d’alerte ne correspond à votre recherche.
          </p>
        )}
      </section>
    </div>
  );
};

export default AlertThresholds;
