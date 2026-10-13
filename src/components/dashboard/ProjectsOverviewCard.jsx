import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, ArrowUpRight } from 'lucide-react';
import DashCard from './DashCard';
import FilterChips from '../ui/FilterChips';
import useMounted from '../../hooks/useMounted';
import { PROJECT_STATUS } from '../../constants/dashboard';

const HEADERS = ['Projet', 'Endpoints', 'Production', 'Documentés', 'Complétion', 'Statut'];

const completion = (p) => Math.round((p.documented.done / p.documented.total) * 100);

const Count = ({ value }) => (
  <div>
    <p className="text-base font-semibold leading-tight text-[var(--text)]">{value.done}</p>
    <p className="text-xs text-[var(--text-muted)]">/ {value.total}</p>
  </div>
);

/**
 * projects   : tous les projets (le tableau sert aussi de sélecteur)
 * selectedId : projet filtré ('' = tous)
 * onSelect   : (id | '') => void
 */
export default function ProjectsOverviewCard({ projects, selectedId, onSelect }) {
  const mounted = useMounted();
  const [status, setStatus] = useState('');

  const options = [
    { value: '', label: 'Tous', count: projects.length },
    ...Object.entries(PROJECT_STATUS).map(([value, s]) => ({
      value, label: s.label, count: projects.filter((p) => p.status === value).length,
    })),
  ];
  const rows = status ? projects.filter((p) => p.status === status) : projects;

  return (
    <DashCard title="Aperçu des projets" icon={FolderOpen}>
      <FilterChips options={options} value={status} onChange={setStatus} ariaLabel="Filtrer par statut" />

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)]">
              {HEADERS.map((h) => (
                <th key={h} className="px-3 py-3 font-medium">{h}</th>
              ))}
              <th className="px-3 py-3"><span className="sr-only">Ouvrir</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p, i) => {
              const Icon = p.icon;
              const st = PROJECT_STATUS[p.status];
              const pct = completion(p);
              const selected = p.id === selectedId;
              const toggle = () => onSelect(selected ? '' : p.id);

              return (
                <tr
                  key={p.id}
                  tabIndex={0}
                  aria-label={`${p.name} : ${selected ? 'filtre actif, cliquer pour retirer' : 'cliquer pour filtrer le tableau de bord'}`}
                  onClick={toggle}
                  onKeyDown={(e) => {
                    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      toggle();
                    }
                  }}
                  className={`cursor-pointer border-b border-[var(--border)] transition-colors last:border-0 ${
                    selected ? 'bg-[var(--accent-tint)] shadow-[inset_3px_0_0_var(--accent)]' : 'hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[var(--text)]">{p.name}</p>
                        <p className="truncate text-xs text-[var(--text-muted)]">{p.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4"><Count value={p.endpoints} /></td>
                  <td className="px-3 py-4"><Count value={p.production} /></td>
                  <td className="px-3 py-4"><Count value={p.documented} /></td>
                  <td className="px-3 py-4" data-tone={st.tone}>
                    <p className="text-sm font-semibold text-[var(--text)]">{pct} %</p>
                    <div className="mt-1.5 h-1.5 w-24 bg-[var(--surface-2)]">
                      <div
                        className="h-full bg-[var(--tone)] transition-[width] duration-700 ease-out motion-reduce:transition-none"
                        style={{ width: mounted ? `${pct}%` : 0, transitionDelay: `${i * 100}ms` }}
                      />
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span data-tone={st.tone} className="tone-badge inline-flex items-center gap-2 whitespace-nowrap px-3 py-1 text-xs font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone)]" />
                      {st.label}
                    </span>
                  </td>
                  <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                    <Link
                      to="/administration/projects"
                      aria-label={`Ouvrir la page des projets (${p.name})`}
                      title="Ouvrir la page des projets"
                      className="icon-btn"
                    >
                      <ArrowUpRight size={17} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="px-3 py-10 text-center text-sm text-[var(--text-muted)]">Aucun projet pour ce statut.</p>
        )}
      </div>
    </DashCard>
  );
}