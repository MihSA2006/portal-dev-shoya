import { FileText, Code2, GitBranch, ClipboardList, AlertCircle, AlertTriangle, Info, Clock, Users, Monitor, Mail } from 'lucide-react';

const EVENT_THRESHOLDS = [
  { value: 'immediate', label: 'Immédiat' },
  { value: '1h', label: 'Sous 1 heure' },
  { value: '4h', label: 'Sous 4 heures' },
  { value: '24h', label: 'Sous 24 heures' },
];

const DAY_THRESHOLDS = [1, 2, 3, 5, 7].map((n) => ({
  value: `${n}d`,
  label: `${n} jour${n > 1 ? 's' : ''} ouvré${n > 1 ? 's' : ''}`,
}));

export const ALERT_RULES = [
  {
    id: 'prod-doc-incomplete',
    number: '01',
    icon: FileText,
    title: 'Endpoint de production sans documentation complète',
    description: "Détecte les endpoints de production dont la documentation technique est incomplète (description, paramètres, exemples, etc.).",
    thresholds: EVENT_THRESHOLDS,
    defaults: { threshold: 'immediate', severity: 'critical' },
  },
  {
    id: 'swagger-mismatch',
    number: '02',
    icon: Code2,
    title: 'Écart entre Swagger et documentation',
    description: "Détecte les différences entre l'implémentation réelle de l'API et la documentation Swagger.",
    thresholds: EVENT_THRESHOLDS,
    defaults: { threshold: 'immediate', severity: 'warning' },
  },
  {
    id: 'pr-too-old',
    number: '03',
    icon: GitBranch,
    title: 'Pull request trop ancienne',
    description: "Alerte lorsqu'une pull request reste ouverte au-delà du seuil de jours ouvrés défini.",
    thresholds: DAY_THRESHOLDS,
    defaults: { threshold: '3d', severity: 'warning' },
  },
  {
    id: 'task-inactive',
    number: '04',
    icon: ClipboardList,
    title: 'Tâche inactive',
    description: "Détecte les tâches inactives depuis plus longtemps que le seuil de jours ouvrés défini.",
    thresholds: DAY_THRESHOLDS,
    defaults: { threshold: '3d', severity: 'warning' },
  },
  {
    id: 'endpoint-not-planned',
    number: '05',
    icon: Code2,
    title: 'Endpoint codé mais non planifié',
    description: "Détecte les endpoints d'API présents dans le dépôt mais absents de toute tâche ou spécification planifiée.",
    thresholds: EVENT_THRESHOLDS,
    defaults: { threshold: 'immediate', severity: 'warning' },
  },
  {
    id: 'invalid-task-branch',
    number: '06',
    icon: GitBranch,
    title: 'Branche de tâche invalide',
    description: "Détecte les tâches poussées sur des branches invalides ou non conventionnelles (mauvais préfixe, branche interdite, etc.).",
    thresholds: EVENT_THRESHOLDS,
    defaults: { threshold: 'immediate', severity: 'critical' },
  },
];

export const SEVERITY_OPTIONS = [
  { value: 'critical', label: 'Critique', icon: AlertCircle, tone: 'danger' },
  { value: 'warning', label: 'Avertissement', icon: AlertTriangle, tone: 'admin' },
  { value: 'info', label: 'Information', icon: Info, tone: 'lead' },
];

export const CHANNELS = [
  { key: 'portal', label: 'Portail', icon: Monitor, description: 'Alertes en temps réel sur la plateforme' },
  { key: 'email', label: 'E-mail', icon: Mail, description: 'Notifications par e-mail' },
  { key: 'digest', label: 'Résumé exécutif quotidien', icon: FileText, description: 'Synthèse quotidienne des alertes importantes' },
];

export const REPORT_TIMES = ['06:00', '07:00', '08:00', '09:00', '12:00', '18:00'].map((t) => ({
  value: t, label: t, icon: Clock,
}));

export const REPORT_RECIPIENTS = [
  { value: 'leadership', label: 'Direction', icon: Users },
  { value: 'admins', label: 'Administrateurs', icon: Users },
  { value: 'leads', label: 'Lead développeurs', icon: Users },
  { value: 'all', label: "Toute l'équipe", icon: Users },
];

export const createDefaultAlertConfig = () => ({
  rules: Object.fromEntries(
    ALERT_RULES.map((r) => [
      r.id,
      { enabled: true, ...r.defaults, channels: { portal: true, email: true, digest: false } },
    ])
  ),
  channels: { portal: true, email: true, digest: true },
  report: { enabled: true, time: '08:00', recipients: 'leadership' },
});
