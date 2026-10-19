import { useCallback, useMemo, useState } from 'react';
import { ENDPOINTS_BY_PROJECT } from '../constants/endpoints';
import { currentVersion } from '../utils/documentation';
import { slugify } from '../utils/endpointLinks';
import { EndpointsContext } from './endpointsContext';

/** Catalogue d'endpoints modifiable : partagé par l'espace Saisie et (si branché) la documentation. */
export const EndpointsProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(ENDPOINTS_BY_PROJECT);

  const getCategories = useCallback((projectId) => catalog[projectId] ?? [], [catalog]);

  /** Ajoute un endpoint (et sa section si elle n'existe pas). `project` = objet projet. */
  const addEndpoint = useCallback(({ project, section, method, path, name, status = 'draft', version }) => {
    const categories = catalog[project.id] ?? [];
    const taken = new Set(categories.flatMap((c) => c.endpoints.map((e) => e.id)));
    const base = slugify(name) || 'endpoint';
    let id = base;
    for (let n = 2; taken.has(id); n += 1) id = `${base}-${n}`;

    const endpoint = {
      id, name, method, path,
      meta: {
        lifecycle: status === 'active' ? 'production' : status === 'deprecated' ? 'deprecated' : 'planned',
        doc: 'incomplete',
        owner: project.docOwner,
        minutes: 0,
        version: version || currentVersion(project),
      },
    };
    const existing = categories.find((c) => c.name.toLowerCase() === section.toLowerCase());
    let category = existing;
    if (!category) {
      const takenCategoryIds = new Set(categories.map((c) => c.id));
      const categoryBase = slugify(section) || `section-${categories.length + 1}`;
      let categoryId = categoryBase;
      for (let n = 2; takenCategoryIds.has(categoryId); n += 1) categoryId = `${categoryBase}-${n}`;
      category = { id: categoryId, name: section, icon: 'box', endpoints: [] };
    }

    setCatalog((prev) => {
      const currentCategories = prev[project.id] ?? [];
      const currentCategory = currentCategories.find((c) => c.id === category.id);
      const next = currentCategory
        ? currentCategories.map((c) => (c.id === category.id ? { ...c, endpoints: [...c.endpoints, endpoint] } : c))
        : [...currentCategories, { ...category, endpoints: [endpoint] }];
      return { ...prev, [project.id]: next };
    });
    return { endpoint, category };
  }, [catalog]);

  const value = useMemo(() => ({ getCategories, addEndpoint }), [getCategories, addEndpoint]);
  return <EndpointsContext.Provider value={value}>{children}</EndpointsContext.Provider>;
};
