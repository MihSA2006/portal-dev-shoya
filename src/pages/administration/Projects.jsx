import { useState } from 'react';
import { Plus } from 'lucide-react';
import { INITIAL_PROJECTS, createProject } from '../../constants/projects.js';
import ProjectList from '../../components/projects/ProjectList.jsx';
import ProjectDetail from '../../components/projects/ProjectDetail.jsx';

const Projects = () => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedId, setSelectedId] = useState(INITIAL_PROJECTS[1].id);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

  const add = () => {
    const project = createProject(Date.now());
    setProjects((list) => [...list, project]);
    setSelectedId(project.id);
  };

  const save = (updated) => setProjects((list) => list.map((p) => (p.id === updated.id ? updated : p)));
  const remove = (id) => {
    const remaining = projects.filter((item) => item.id !== id);
    setProjects(remaining);
    setSelectedId(remaining[0]?.id ?? null);
  };

  return (
    <div className="flex flex-col gap-6 lg:h-[calc(100dvh-6.5rem)] lg:min-h-0">
      <header className="cut-frame flex flex-wrap items-end justify-between gap-4 p-5 [--frame-bg:var(--surface)]">
        <div>
          <h1 className="font-display text-3xl font-semibold">Projets</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Gérez et configurez vos projets.</p>
        </div>
        <button type="button" onClick={add} className="btn btn-primary">
          <Plus size={17} /> Ajouter un projet
        </button>
      </header>

      <div className="grid gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-stretch">
        <ProjectList projects={projects} selectedId={selected?.id} onSelect={setSelectedId} />
        {selected && <ProjectDetail key={selected.id} project={selected} onSave={save} onDelete={remove} />}
      </div>
    </div>
  );
};

export default Projects;
