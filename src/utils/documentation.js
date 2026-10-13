export const isConnected = (project) => Boolean(project.repo && project.github.token);

export const currentVersion = (project) => project.docs.versions.at(-1);

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const getProjectSlug = (project) => slugify(project.name) || 'projet';

export const getEndpointSlug = (endpoint) =>
  slugify(endpoint.name) || slugify(endpoint.path) || 'endpoint';

/** Chiffres de l'en-tête "Écosystème API". */
export const summarize = (projects) => {
  const connected = projects.filter(isConnected);
  const versions = new Set(projects.flatMap((p) => p.docs.versions));
  const covered = projects.filter((p) => p.docs.endpoints > 0);
  return {
    projects: projects.length,
    endpoints: projects.reduce((sum, p) => sum + p.docs.endpoints, 0),
    versions: versions.size,
    coverage: covered.length
      ? Math.round(covered.reduce((sum, p) => sum + p.docs.coverage, 0) / covered.length)
      : 0,
    online: connected.length > 0,
    lastSync: connected.length ? Math.min(...connected.map((p) => p.docs.syncMinutes ?? Infinity)) : null,
  };
};
