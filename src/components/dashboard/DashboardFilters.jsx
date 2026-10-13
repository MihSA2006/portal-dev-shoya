import { SlidersHorizontal, Layers, X } from 'lucide-react';
import Dropdown from '../ui/Dropdown';

export default function DashboardFilters({ projects, value, onChange }) {
  const options = [
    { value: '', label: 'Tous les projets', icon: Layers },
    ...projects.map((p) => ({ value: p.id, label: p.name, icon: p.icon })),
  ];

  return (
    <div className="cut-open cut-sm [--frame-bg:var(--surface)] focus-within:z-20 [&:has([aria-expanded=true])]:z-20">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-soft)]">
          <SlidersHorizontal size={17} className="text-[var(--accent)]" /> Filtres
        </span>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)]">Projet</span>
          <Dropdown className="w-56" value={value} onChange={onChange} options={options} ariaLabel="Filtrer par projet" />
        </div>

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="inline-flex h-9 items-center gap-1.5 border border-[var(--border-strong)] px-3 text-xs text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <X size={14} /> Réinitialiser
          </button>
        )}

        <p className="text-xs text-[var(--text-muted)] lg:ml-auto" aria-live="polite">
          {value
            ? 'Les indicateurs, graphiques et listes sont filtrés sur ce projet.'
            : "Astuce : cliquez sur un projet de l'aperçu pour filtrer tout le tableau de bord."}
        </p>
      </div>
    </div>
  );
}