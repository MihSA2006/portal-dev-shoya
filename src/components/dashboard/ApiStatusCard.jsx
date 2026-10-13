import { useState } from 'react';
import { Server } from 'lucide-react';
import DashCard from './DashCard';
import Sparkline from './Sparkline';

// Moyenne point par point des tendances des services affichés
const averageTrend = (systems) =>
  systems[0].trend.map((_, i) => Math.round(systems.reduce((acc, s) => acc + s.trend[i], 0) / systems.length));

/** Cliquer sur un service affiche sa propre tendance ; recliquer revient à la vue globale. */
export default function ApiStatusCard({ systems, scope }) {
  const [selectedId, setSelectedId] = useState(null);
  const current = systems.find((s) => s.id === selectedId) ?? null;
  const allUp = systems.every((s) => s.up);
  const trend = current ? current.trend : averageTrend(systems);

  return (
    <DashCard title="Statut de l'API en production" icon={Server} scope={scope} bodyClassName="flex h-full flex-col p-5">
      <div
        data-tone={allUp ? 'accent' : 'admin'}
        className="tone-badge flex items-center gap-3 px-4 py-2.5 text-sm font-medium"
      >
        <span className="h-2 w-2 rounded-full bg-[var(--tone)]" />
        {allUp ? 'Tous les systèmes sont opérationnels' : 'Dégradation détectée sur un service'}
      </div>

      <ul className="mt-4 space-y-3">
        {systems.map(({ id, name, icon: Icon, uptime, latency, up }) => {
          const selected = id === current?.id;
          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedId(selected ? null : id)}
                className={`flex w-full items-center gap-3 border px-3 py-2.5 text-left text-sm transition-colors ${
                  selected
                    ? 'border-[var(--accent)] bg-[var(--accent-tint)]'
                    : 'border-[var(--border-strong)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]'
                }`}
              >
                <Icon size={17} className="shrink-0 text-[var(--accent)]" />
                <span className="min-w-0 flex-1 truncate text-[var(--text)]">{name}</span>
                <span className="text-[var(--accent)]">{uptime}</span>
                <span className="w-12 text-right text-[var(--text-muted)]">{latency}</span>
                <span
                  role="img"
                  aria-label={up ? 'Opérationnel' : 'Hors service'}
                  data-tone={up ? 'accent' : 'danger'}
                  className="h-2 w-2 shrink-0 rounded-full bg-[var(--tone)]"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-6">
        <p className="mb-2 text-xs text-[var(--text-muted)]" aria-live="polite">
          Tendance sur 24 h — {current ? current.name : 'tous les services'}
        </p>
        <Sparkline key={current?.id ?? 'all'} data={trend} />
      </div>
    </DashCard>
  );
}