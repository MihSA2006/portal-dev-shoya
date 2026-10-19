import { getEndpointSlug } from './documentation';

export const slugify = (text) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/*
 * ⚠️ Seul endroit qui construit les liens vers la documentation d'un endpoint.
 * Si votre app expose déjà une fonction pour le slug du projet (ex. getProjectSlug) ou un autre
 * format d'URL, adaptez uniquement ces deux lignes.
 */
export const projectSlug = (project) => slugify(project.name);
export const endpointPath = (project, endpoint) => `/documentation/${projectSlug(project)}/endpoints/${getEndpointSlug(endpoint)}`;
