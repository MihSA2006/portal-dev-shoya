const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

export const getInitials = (name = '') =>
  name
    .replace(/[^\p{L}\s_]/gu, '')
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

export const timeAgo = (timestamp) => {
  const diff = (timestamp - Date.now()) / 1000;
  for (const [unit, seconds] of [['day', 86400], ['hour', 3600], ['minute', 60]]) {
    if (Math.abs(diff) >= seconds) return rtf.format(Math.round(diff / seconds), unit);
  }
  return "à l'instant";
};

export const filterTasks = (tasks, { project, assignee, cycle }) =>
  tasks.filter(
    (task) =>
      (project === 'all' || task.projectId === project) &&
      (assignee === 'all' || task.assigneeId === assignee) &&
      (cycle === 'all' || task.cycleId === cycle),
  );

export const groupByStatus = (tasks, statuses) =>
  Object.fromEntries(statuses.map((s) => [s.id, tasks.filter((t) => t.status === s.id)]));

// NOVA-12, NOVA-13… : prochain numéro libre pour la clé du projet.
export const nextTaskKey = (tasks, project) => {
  const max = tasks
    .filter((t) => t.projectId === project.id)
    .reduce((acc, t) => Math.max(acc, Number(t.key.split('-').pop()) || 0), 0);
  return `${project.key}-${max + 1}`;
};

// Déplace une tâche dans une colonne, avant `beforeId` (sinon à la fin).
export const moveTask = (tasks, id, status, beforeId = null) => {
  const task = tasks.find((t) => t.id === id);
  if (!task || beforeId === id) return tasks;

  const rest = tasks.filter((t) => t.id !== id);
  const moved = { ...task, status };
  const index = beforeId ? rest.findIndex((t) => t.id === beforeId) : -1;

  if (index === -1) return [...rest, moved];
  rest.splice(index, 0, moved);
  return rest;
};

export const formatDateTime = (timestamp) =>
  new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short' }).format(timestamp);

// Avancement du cycle (0–100) selon la date du jour.
export const cycleProgress = (cycle) => {
  if (!cycle) return 0;
  const start = new Date(cycle.startsAt).getTime();
  const end = new Date(cycle.endsAt).getTime();
  return Math.round(Math.min(1, Math.max(0, (Date.now() - start) / (end - start))) * 100);
};
