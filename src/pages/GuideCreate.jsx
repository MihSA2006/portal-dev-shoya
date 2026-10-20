import { useNavigate } from 'react-router-dom';
import { useGuides } from '../context/guidesContext';
import { useProjects } from '../context/ProjectsContext';
import GuideList from '../components/guides/GuideList';
import NewGuideForm from '../components/guides/NewGuideForm';

/** Point d'entrée « Créer un guide » : liste des guides + formulaire (projet, titre) → éditeur Markdown. */
const GuideCreate = () => {
  const { guides, createGuide } = useGuides();
  const { projects } = useProjects();
  const navigate = useNavigate();

  const create = (data) => navigate(`/guides/${createGuide(data).id}`);

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-6">
      <header className="cut-frame [--frame-bg:var(--surface)]">
        <div className="p-5">
          <h1 className="font-display text-3xl font-semibold">Guides</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Parcourez les guides existants ou créez-en un nouveau pour un projet.</p>
        </div>
      </header>

      <div className="cut-frame flex min-h-0 flex-1 flex-col overflow-hidden [--frame-bg:var(--surface)]">
        <NewGuideForm projects={projects} guides={guides} onCreate={create} />
        <div className="min-h-0 flex-1 overflow-y-auto border-t border-[var(--border)]">
          <GuideList guides={guides} projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default GuideCreate;
