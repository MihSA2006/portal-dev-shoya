import { CARD_TONES } from '../constants/documentation';
import { ENDPOINT_META } from '../constants/endpointMeta';
import { currentVersion } from './documentation';
import { endpointPath } from './endpointLinks';

export const INITIAL_FILTERS = {
  query: '', project: 'all', method: 'all', status: 'all', section: 'all', version: 'all', owner: 'all', doc: 'all', recent: false,
};

export const RECENT_MINUTES = 1440;

export const CHIPS = [
  { id: 'all', label: 'Tous', patch: { status: 'all', doc: 'all', recent: false } },
  { id: 'production', label: 'En production', patch: { status: 'production', doc: 'all', recent: false } },
  { id: 'development', label: 'En développement', patch: { status: 'development', doc: 'all', recent: false } },
  { id: 'test', label: 'En test', patch: { status: 'test', doc: 'all', recent: false } },
  { id: 'planned', label: 'Planifié', patch: { status: 'planned', doc: 'all', recent: false } },
  { id: 'attention', label: 'Documentation à traiter', patch: { status: 'all', doc: 'todo', recent: false } },
  { id: 'recent', label: 'Mis à jour récemment', patch: { status: 'all', doc: 'all', recent: true } },
];

export const activeChip = (f) => {
  if (f.recent) return 'recent';
  if (f.doc === 'todo') return 'attention';
  if (f.status !== 'all') return CHIPS.some((c) => c.id === f.status) ? f.status : null;
  return f.doc === 'all' ? 'all' : null;
};

const resolveMeta = (project, endpoint) => ({
  lifecycle: 'planned',
  doc: 'incomplete',
  owner: project.docOwner,
  minutes: null,
  version: currentVersion(project),
  ...ENDPOINT_META[`${project.id}/${endpoint.id}`],
  ...endpoint.meta, // endpoints créés depuis l'interface
});

/** Liste plate de tous les endpoints de tous les projets. */
export const buildRegistry = (projects, getCategories) =>
  projects.flatMap((project, index) =>
    getCategories(project.id).flatMap((category) =>
      category.endpoints.map((endpoint) => ({
        key: `${project.id}/${endpoint.id}`,
        id: endpoint.id,
        method: endpoint.method,
        path: endpoint.path,
        description: endpoint.name,
        project,
        tone: CARD_TONES[index % CARD_TONES.length],
        section: category.name,
        ...resolveMeta(project, endpoint),
        to: endpointPath(project, endpoint),
      }))
    )
  );

export const filterRows = (rows, f) => {
  const q = f.query.trim().toLowerCase();
  return rows.filter(
    (r) =>
      (f.project === 'all' || String(r.project.id) === f.project) &&
      (f.method === 'all' || r.method === f.method) &&
      (f.status === 'all' || r.lifecycle === f.status) &&
      (f.section === 'all' || r.section === f.section) &&
      (f.version === 'all' || r.version === f.version) &&
      (f.owner === 'all' || r.owner === f.owner) &&
      (f.doc === 'all' || (f.doc === 'todo' ? r.doc !== 'complete' : r.doc === f.doc)) &&
      (!f.recent || (r.minutes != null && r.minutes <= RECENT_MINUTES)) &&
      (!q || [r.path, r.description, r.project.name, r.section, r.id].some((v) => v.toLowerCase().includes(q)))
  );
};

const byMinutes = (a, b) => (a.minutes ?? Infinity) - (b.minutes ?? Infinity);

export const sortRows = (rows, sort) => {
  const list = [...rows];
  if (sort === 'path') return list.sort((a, b) => a.path.localeCompare(b.path));
  if (sort === 'project') return list.sort((a, b) => a.project.name.localeCompare(b.project.name) || a.path.localeCompare(b.path));
  return list.sort(byMinutes);
};

export const computeStats = (rows) => {
  const complete = rows.filter((r) => r.doc === 'complete').length;
  return {
    total: rows.length,
    projects: new Set(rows.map((r) => r.project.id)).size,
    production: rows.filter((r) => r.lifecycle === 'production').length,
    complete,
    coverage: rows.length ? Math.round((complete / rows.length) * 100) : 0,
    attention: rows.filter((r) => r.doc === 'incomplete' || r.doc === 'review').length,
  };
};

export const unique = (rows, pick) => [...new Set(rows.map(pick))].sort();

export const ownerName = (handle) => {
  const name = handle.replace('@', '');
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/** Numéros de page affichés, avec "…" (ex. [1, '…', 4, 5, 6, '…', 12]). */
export const pageList = (current, pages) => {
  if (pages <= 6) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, current - 1, current, current + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = [...set].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i && p - sorted[i - 1] > 1 ? ['…', p] : [p]));
};
