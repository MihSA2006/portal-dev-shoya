import { ENDPOINTS_BY_PROJECT } from '../constants/endpoints';
import { getEndpointSlug } from './documentation';

/** Catégories d'endpoints d'un projet ([] si aucune). */
export const getCategories = (projectId) => ENDPOINTS_BY_PROJECT[projectId] ?? [];

/** Retrouve un endpoint (et sa catégorie) par son slug dans la liste des catégories. */
export const findEndpointBySlug = (categories, endpointSlug) => {
  for (const category of categories) {
    const endpoint = category.endpoints.find((e) => getEndpointSlug(e) === endpointSlug);
    if (endpoint) return { ...endpoint, category };
  }
  return null;
};
