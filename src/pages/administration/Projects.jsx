import { useMemo, useState } from 'react';
import { FolderKanban, Pencil, Plus, Search, Trash2 } from 'lucide-react';

const PROJECTS = [
  { id: 1, name: 'Portail Shoya', key: 'SHOYA', owner: 'Tiana Andrianina', status: 'active', progress: 72, updatedAt: "Aujourd'hui" },
  { id: 2, name: 'Application mobile', key: 'MOBILE', owner: 'Hanitra Rakoto', status: 'active', progress: 48, updatedAt: 'Hier' },
  { id: 3, name: 'Migration API', key: 'API-V2', owner: 'Fanomezantsoa Mickael', status: 'planned', progress: 0, updatedAt: '12 oct. 2026' },
  { id: 4, name: 'Espace client', key: 'CLIENT', owner: 'Tiana Andrianina', status: 'completed', progress: 100, updatedAt: '30 sept. 2026' },
];

const STATUS = {
  active: { label: 'En cours', cls: 'border-[var(--accent)] bg-[var(--accent-tint)] text-[var(--accent)]' },
  planned: { label: 'Planifié', cls: 'border-[var(--cyan)] bg-[var(--cyan-soft)] text-[var(--cyan)]' },
  completed: { label: 'Terminé', cls: 'border-[var(--border-strong)] text-[var(--text-muted)]' },
};

const Projects = () => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const projects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((project) =>
      (!status || project.status === status)
      && (!q || project.name.toLowerCase().includes(q)
        || project.key.toLowerCase().includes(q)
        || project.owner.toLowerCase().includes(q))
    );
  }, [query, status]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Projets</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Gérez les projets de votre organisation, leurs responsables et leur avancement.
          </p>
        </div>
        <button
          type="button"
          className="cut-frame cut-sm inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold text-[var(--on-accent)] [--frame-border:var(--accent)] [--frame-bg:var(--accent)] hover:[--frame-bg:var(--accent-strong)]"
        >
          <Plus size={17} /> Créer un projet
        </button>
      </header>

      <div className="flex flex-wrap gap-3">
        <label className="cut-frame cut-sm flex h-10 min-w-[240px] flex-1 items-center gap-3 px-3.5 sm:max-w-md focus-within:[--frame-border:var(--accent)]">
          <Search size={17} className="text-[var(--accent)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher par nom, code ou responsable..."
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
                <th className="px-5 py-3 font-medium">Projet</th>
                <th className="px-5 py-3 font-medium">Responsable</th>
                <th className="px-5 py-3 font-medium">Statut</th>
                <th className="px-5 py-3 font-medium">Avancement</th>
                <th className="px-5 py-3 font-medium">Mise à jour</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--surface-2)]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
                        <FolderKanban size={17} />
                      </span>
                      <div>
                        <p className="font-medium text-[var(--text)]">{project.name}</p>
                        <p className="text-xs text-[var(--text-muted)]">{project.key}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-soft)]">{project.owner}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block border px-2 py-0.5 text-xs font-medium ${STATUS[project.status].cls}`}>
                      {STATUS[project.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 bg-[var(--surface-2)]">
                        <div className="h-full bg-[var(--accent)]" style={{ width: `${project.progress}%` }} />
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--text-muted)]">{project.updatedAt}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button className="icon-btn" aria-label={`Modifier ${project.name}`} title="Modifier"><Pencil size={17} /></button>
                      <button className="icon-btn" aria-label={`Supprimer ${project.name}`} title="Supprimer"><Trash2 size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-[var(--text-muted)]">
            Aucun projet ne correspond à votre recherche.
          </p>
        )}
      </section>
    </div>
  );
};

export default Projects;
