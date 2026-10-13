import {
  PROJECTS, KPI_DEFS, ALL_TRENDS, EXPECTED_PROGRESS, CYCLE, ACTIVITY, ALERTS, API_STATUS,
} from '../constants/dashboard';

const sum = (list, fn) => list.reduce((acc, p) => acc + fn(p), 0);

// Moyenne pondérée par le nombre d'endpoints en production
const weighted = (list, fn) => {
  const total = sum(list, (p) => p.production.done) || 1;
  return sum(list, (p) => fn(p) * p.production.done) / total;
};

export function computeKpis(projects, isAll) {
  const values = {
    projects: projects.length,
    endpoints: sum(projects, (p) => p.endpoints.done),
    production: sum(projects, (p) => p.production.done),
    documentation: Math.round(weighted(projects, (p) => p.docHealth.completed)),
    pullRequests: sum(projects, (p) => p.pullRequests),
    tasks: sum(projects, (p) => p.tasks),
  };

  return KPI_DEFS.map((def) => ({
    ...def,
    value: values[def.id],
    trend: isAll ? ALL_TRENDS[def.id] : projects[0]?.trends[def.id] ?? 0,
  }));
}

export function computeDocHealth(projects) {
  const completed = Math.round(weighted(projects, (p) => p.docHealth.completed));
  const inProgress = Math.round(weighted(projects, (p) => p.docHealth.inProgress));
  return { completed, inProgress, notStarted: Math.max(0, 100 - completed - inProgress) };
}

export function computeCycleProgress(projects, currentWeek) {
  return EXPECTED_PROGRESS.map((expected, i) => ({
    expected,
    actual: i < currentWeek ? Math.round(sum(projects, (p) => p.progress[i]) / projects.length) : null,
  }));
}

/** Toutes les données du tableau de bord pour un projet donné ('' = tous). */
export function buildDashboardView(projectId) {
  const projects = projectId ? PROJECTS.filter((p) => p.id === projectId) : PROJECTS;
  const forProject = (item) => !projectId || item.project === projectId;

  return {
    kpis: computeKpis(projects, !projectId),
    progress: computeCycleProgress(projects, CYCLE.week),
    health: computeDocHealth(projects),
    activity: ACTIVITY.filter(forProject),
    alerts: ALERTS.filter(forProject),
    systems: API_STATUS.systems.filter(forProject),
  };
}