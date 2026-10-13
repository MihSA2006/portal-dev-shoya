import { EMPTY_OVERVIEW, OVERVIEW_BY_PROJECT } from '../constants/overview';
import { currentVersion } from './documentation';

export const getOverview = (projectId) => OVERVIEW_BY_PROJECT[projectId] ?? EMPTY_OVERVIEW;

/** URL de base d'un environnement : "<url>/<version>" ('' si l'URL n'est pas renseignée). */
export const getBaseUrl = (project, env) => {
  const url = project.environments[env];
  return url ? `${url.replace(/\/+$/, '')}/${currentVersion(project)}` : '';
};

export const envHealth = (project, overview, env) =>
  project.environments[env] ? overview.health[env] ?? { status: 'unknown', latency: null } : { status: 'unknown', latency: null };

export const overallStatus = (statuses) => {
  const known = statuses.filter((s) => s !== 'unknown');
  if (known.length === 0) return 'unknown';
  if (known.includes('down')) return 'down';
  if (known.includes('degraded')) return 'degraded';
  return 'operational';
};

export const docHealthCounts = (project, overview) => {
  const total = project.docs.endpoints;
  const complete = Math.round((total * project.docs.coverage) / 100);
  const inReview = Math.min(overview.inReview, Math.max(total - complete, 0));
  return { total, complete, inReview, incomplete: Math.max(total - complete - inReview, 0), pct: project.docs.coverage };
};

/** Requête d'exemple : celle des données, sinon le premier endpoint du catalogue. */
export const resolveQuickStart = (overview, categories) => {
  if (overview.quickStart) return overview.quickStart;
  const first = categories[0]?.endpoints[0];
  return first ? { method: first.method, path: first.path, body: first.method === 'GET' ? null : '{}' } : null;
};

/** Construit l'exemple cURL : lignes de segments [texte, type] (pour la coloration) + texte brut à copier. */
export const buildCurl = (baseUrl, { method, path, body }) => {
  const lines = [
    [['curl', 'cmd'], [` -X ${method} `, 'plain'], [`${baseUrl}${path}`, 'url']],
    [['  -H ', 'plain'], ['"Authorization: Bearer YOUR_API_KEY"', 'str']],
  ];
  if (body) {
    lines.push([['  -H ', 'plain'], ['"Content-Type: application/json"', 'str']]);
    lines.push([['  -d ', 'plain'], [`'${body}'`, 'str']]);
  }
  const withContinuation = lines.map((line, i) => (i < lines.length - 1 ? [...line, [' \\', 'plain']] : line));
  const text = withContinuation.map((line) => line.map(([t]) => t).join('')).join('\n');
  return { lines: withContinuation, text };
};

/** Série de démonstration croissante, déterministe (seed = id du projet). */
export const buildSeries = (length, peak, seed) =>
  Array.from({ length }, (_, i) => {
    const t = i / (length - 1);
    return Math.round(peak * (0.3 + 0.7 * t) * (1 + 0.1 * Math.sin(i * 1.9 + seed)));
  });

const niceStep = (raw) => {
  const m = 10 ** Math.floor(Math.log10(raw));
  const n = raw / m;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * m;
};

/** 4 graduations (0 à max arrondi). */
export const getTicks = (max) => {
  const step = niceStep(Math.max(max, 1) / 3);
  return [0, 1, 2, 3].map((i) => i * step);
};

export const formatCompact = (v) => (v >= 1000 ? `${+(v / 1000).toFixed(1)}k` : String(v));
