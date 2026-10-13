import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';
import DashCard from './DashCard';
import FilterChips from '../ui/FilterChips';
import { ALERT_SEVERITY } from '../../constants/dashboard';

export default function OpenAlertsCard({ alerts, scope }) {
  const [severity, setSeverity] = useState('');

  // Le badge compte les alertes à traiter (élevées et moyennes)
  const actionable = alerts.filter((a) => a.severity === 'high' || a.severity === 'medium').length;

  const present = Object.keys(ALERT_SEVERITY).filter((k) => alerts.some((a) => a.severity === k));
  const options = [
    { value: '', label: 'Toutes', count: alerts.length },
    ...present.map((k) => ({ value: k, label: ALERT_SEVERITY[k].label, count: alerts.filter((a) => a.severity === k).length })),
  ];
  const effective = present.includes(severity) ? severity : '';
  const visible = effective ? alerts.filter((a) => a.severity === effective) : alerts;

  return (
    <DashCard
      title="Alertes ouvertes"
      icon={Bell}
      scope={scope}
      badge={<span data-tone="accent" className="tone-badge px-2 py-0.5 text-xs font-semibold">{actionable}</span>}
    >
      {alerts.length > 1 && (
        <div className="mb-3">
          <FilterChips options={options} value={effective} onChange={setSeverity} ariaLabel="Filtrer par sévérité" />
        </div>
      )}

      {alerts.length === 0 ? (
        <p className="py-8 text-center text-sm text-[var(--text-muted)]">Aucune alerte ouverte pour ce projet.</p>
      ) : (
        <ul className="-mx-2 divide-y divide-[var(--border)]">
          {visible.map((a) => {
            const sev = ALERT_SEVERITY[a.severity];
            return (
              <li key={a.id}>
                <Link
                  to={a.to}
                  className="group block px-2 py-3 transition-colors hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span data-tone={sev.tone} className="tone-badge inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone)]" /> {sev.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      {a.time}
                      <ChevronRight size={14} className="text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[var(--text)]">{a.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">{a.subtitle}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </DashCard>
  );
}