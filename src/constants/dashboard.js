import {
  Layers, Network, Server, FileText, GitBranch, CheckCircle2,
  Leaf, Box, GitMerge, GitPullRequest, AlertCircle, Database,
} from 'lucide-react';

/* Données de démonstration : à remplacer par votre API */

export const CYCLE = { number: 14, week: 4, totalWeeks: 6 };

// Progression attendue (identique pour tous les projets)
export const EXPECTED_PROGRESS = [17, 33, 50, 67, 83, 100];

export const KPI_DEFS = [
  { id: 'projects',      label: 'Total projets',                  icon: Layers,       to: '/administration/projects' },
  { id: 'endpoints',     label: 'Total endpoints',                icon: Network,      to: '/documentation' },
  { id: 'production',    label: 'Endpoints en production',        icon: Server,       to: '/documentation' },
  { id: 'documentation', label: 'Complétion de la documentation', icon: FileText,     to: '/documentation', suffix: '%' },
  { id: 'pullRequests',  label: 'Pull requests ouvertes',         icon: GitBranch,    to: '/tasks' },
  { id: 'tasks',         label: 'Tâches actives',                 icon: CheckCircle2, to: '/tasks' },
];

// Tendances « tous les projets » (vs cycle précédent)
export const ALL_TRENDS = { projects: 0, endpoints: 12, production: 14, documentation: 8, pullRequests: -30, tasks: -25 };

export const PROJECT_STATUS = {
  on_track:    { label: 'Dans les temps', tone: 'accent' },
  in_progress: { label: 'En cours',       tone: 'lead' },
  at_risk:     { label: 'À risque',       tone: 'danger' },
};

export const PROJECTS = [
  {
    id: 'wallet', name: 'Shoya Wallet', description: 'Portefeuille numérique et paiements', icon: Leaf,
    endpoints: { done: 18, total: 22 }, production: { done: 12, total: 16 }, documented: { done: 16, total: 22 },
    status: 'on_track', pullRequests: 3, tasks: 7,
    docHealth: { completed: 73, inProgress: 17, notStarted: 10 },
    progress: [16, 29, 47, 63],
    trends: { endpoints: 10, production: 12, documentation: 6, pullRequests: -20, tasks: -15 },
  },
  {
    id: 'novapay', name: 'NovaPay', description: 'Infrastructure de paiement', icon: Layers,
    endpoints: { done: 20, total: 24 }, production: { done: 16, total: 20 }, documented: { done: 15, total: 20 },
    status: 'on_track', pullRequests: 2, tasks: 6,
    docHealth: { completed: 80, inProgress: 14, notStarted: 6 },
    progress: [15, 28, 46, 62],
    trends: { endpoints: 14, production: 15, documentation: 9, pullRequests: -40, tasks: -30 },
  },
  {
    id: 'core', name: 'shoya_core', description: 'Plateforme et services centraux', icon: Box,
    endpoints: { done: 10, total: 12 }, production: { done: 4, total: 8 }, documented: { done: 7, total: 12 },
    status: 'in_progress', pullRequests: 2, tasks: 5,
    docHealth: { completed: 68, inProgress: 20, notStarted: 12 },
    progress: [14, 27, 45, 61],
    trends: { endpoints: 12, production: 16, documentation: 10, pullRequests: -25, tasks: -30 },
  },
];

export const ACTIVITY = [
  { id: 1, project: 'novapay', icon: GitMerge,       tone: 'accent', title: 'PR #842 fusionnée',         subtitle: 'NovaPay · feat/api-webhooks',   time: 'Il y a 12 min', to: '/tasks' },
  { id: 2, project: 'wallet',  icon: FileText,       tone: 'lead',   title: 'Documentation mise à jour', subtitle: 'Shoya Wallet · API Reference',  time: 'Il y a 28 min', to: '/documentation' },
  { id: 3, project: 'core',    icon: CheckCircle2,   tone: 'accent', title: 'Tâche terminée',            subtitle: 'shoya_core · Improve logging',  time: 'Il y a 1 h',    to: '/tasks' },
  { id: 4, project: 'novapay', icon: AlertCircle,    tone: 'doc',    title: 'Nouveau ticket créé',       subtitle: 'NovaPay · Bug #317',            time: 'Il y a 2 h',    to: '/tasks' },
  { id: 5, project: 'wallet',  icon: GitPullRequest, tone: 'accent', title: 'PR #841 ouverte',           subtitle: 'Shoya Wallet · fix/validation', time: 'Il y a 3 h',    to: '/tasks' },
];

export const ALERT_SEVERITY = {
  high:   { label: 'Élevée',  tone: 'danger' },
  medium: { label: 'Moyenne', tone: 'admin' },
  low:    { label: 'Faible',  tone: 'lead' },
  info:   { label: 'Info',    tone: 'accent' },
};

export const ALERTS = [
  { id: 1, project: 'novapay', severity: 'high',   title: 'Latence élevée sur un endpoint de production', subtitle: 'NovaPay · /api/v1/payments',     time: 'Il y a 18 min', to: '/administration/alert-thresholds' },
  { id: 2, project: 'core',    severity: 'medium', title: 'Documentation en retard sur le planning',      subtitle: 'shoya_core',                     time: 'Il y a 1 h',    to: '/administration/alert-thresholds' },
  { id: 3, project: 'wallet',  severity: 'low',    title: "Taux d'erreur élevé (5,2 %)",                  subtitle: 'Shoya Wallet · /api/v1/wallets', time: 'Il y a 2 h',    to: '/administration/alert-thresholds' },
  { id: 4, project: 'core',    severity: 'info',   title: 'Nouvelle version disponible',                  subtitle: 'PostgreSQL 17.4',                time: 'Il y a 4 h',    to: '/administration/alert-thresholds' },
];

const BASE_TREND = [40, 42, 41, 44, 43, 45, 44, 47, 46, 48, 47, 50, 49, 52, 51, 50, 53, 55, 54, 56, 55, 58, 57, 60];
const variant = (offset) => BASE_TREND.map((v, i) => v + ((i * 7 + offset * 5) % 6) - 3);

export const API_STATUS = {
  systems: [
    { id: 'wallet',  project: 'wallet',  name: 'Shoya Wallet API', icon: Database, uptime: '99,98 %', latency: '12 ms', up: true, trend: variant(1) },
    { id: 'novapay', project: 'novapay', name: 'NovaPay API',      icon: Database, uptime: '99,95 %', latency: '18 ms', up: true, trend: variant(2) },
    { id: 'core',    project: 'core',    name: 'shoya_core API',   icon: Box,      uptime: '99,97 %', latency: '15 ms', up: true, trend: variant(3) },
  ],
};