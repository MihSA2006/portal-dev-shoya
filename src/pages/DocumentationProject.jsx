import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { getCategories } from '../utils/endpoints';
import ProjectSidebar from '../components/documentation/project/ProjectSidebar';
import ProjectOverview from './documentation/ProjectOverview';
import EndpointDetails from './documentation/EndpointDetails';
import GuideDetails from './documentation/GuideDetails';
import { getProjectSlug } from '../utils/documentation';
import { useGuides } from '../context/guidesContext';


/**
 * Gabarit d'un projet : sidebar du projet + contenu.
 * Routes internes (relatives à /documentation/:projectSlug) :
 *   ""                      -> Vue d'ensemble
 *   "endpoints/:endpointSlug" -> Détail d'un endpoint
 */
const DocumentationProject = () => {
  const { projectSlug } = useParams();
  const { projects } = useProjects();
  const { guides } = useGuides();
  const project = projects.find((p) => getProjectSlug(p) === projectSlug);

  if (!project) {
    return (
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold">Projet introuvable</h1>
        <Link to="/documentation" className="text-sm text-[var(--accent)] underline">Retour à la documentation</Link>
      </div>
    );
  }

  const categories = getCategories(project.id);
  const projectGuides = guides.filter((guide) => guide.projectId === project.id);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <ProjectSidebar key={project.id} project={project} categories={categories} guides={projectGuides} />

      <div className="min-w-0">
        <Routes>
          <Route index element={<ProjectOverview key={project.id} project={project} categories={categories} />} />
          <Route path="endpoints/:endpointSlug" element={<EndpointDetails key={project.id} project={project} categories={categories} />} />
          <Route path="guides/:guideId" element={<GuideDetails project={project} />} />
          <Route path="*" element={<Navigate to={`/documentation/${getProjectSlug(project)}`} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DocumentationProject;
