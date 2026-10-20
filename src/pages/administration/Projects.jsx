import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProjects } from '../../context/ProjectsContext';
import ProjectList from '../../components/projects/ProjectList';
import ProjectDetail from '../../components/projects/ProjectDetail';
import { AdminProjectsSkeleton } from '../../components/ui/LoadingSkeleton';
import useInitialSkeleton from '../../hooks/useInitialSkeleton';

const Projects = () => {
  const loading = useInitialSkeleton();
  const { projects, addProject, saveProject, deleteProject } = useProjects();
  const [selectedId, setSelectedId] = useState(projects[1]?.id ?? projects[0]?.id);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];

  if (loading) return <AdminProjectsSkeleton />;

  const add = () => setSelectedId(addProject().id);
  const remove = (id) => {
    deleteProject(id);
    setSelectedId(projects.find((project) => project.id !== id)?.id);
  };

  return (
    <div className="page-content-enter space-y-6 lg:flex lg:h-[calc(100dvh-6rem)] lg:min-h-0 lg:flex-col">
      <header className="flex shrink-0 flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Projets</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Gérez et configurez vos projets.</p>
        </div>
        <button type="button" onClick={add} className="btn btn-primary">
          <Plus size={17} /> Ajouter un projet
        </button>
      </header>

      <div className="grid gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-[340px_minmax(0,1fr)]">
        <ProjectList projects={projects} selectedId={selected?.id} onSelect={setSelectedId} />
        {selected && <ProjectDetail key={selected.id} project={selected} onSave={saveProject} onDelete={remove} />}
      </div>
    </div>
  );
};

export default Projects;
