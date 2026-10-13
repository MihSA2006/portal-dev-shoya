import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { INITIAL_PROJECTS, createProject } from '../constants/projects';

const ProjectsContext = createContext(null);

/** Source unique des projets : partagée par l'administration, la documentation et la sidebar. */
export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);

  const addProject = useCallback(() => {
    const project = createProject(Date.now());
    setProjects((list) => [...list, project]);
    return project;
  }, []);

  const saveProject = useCallback(
    (updated) => setProjects((list) => list.map((p) => (p.id === updated.id ? updated : p))),
    []
  );

  const deleteProject = useCallback((id) => setProjects((list) => list.filter((p) => p.id !== id)), []);

  const value = useMemo(
    () => ({ projects, addProject, saveProject, deleteProject }),
    [projects, addProject, saveProject, deleteProject]
  );
  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
};

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects doit être utilisé dans <ProjectsProvider>.');
  return ctx;
};
