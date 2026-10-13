import {
  UserPlus, UserCog, Upload, FileText, KeyRound, Users,
  Check, X, AlertTriangle, User, Zap, Layers, Calendar, Shield,
} from 'lucide-react';
import GithubIcon from '../components/ui/GithubIcon';

export const ACTIONS = {
  user_created:       { label: 'Utilisateur créé',                icon: UserPlus, resources: ['user:john.doe', 'user:andry.r', 'user:lova.m'] },
  role_changed:       { label: 'Rôle modifié',                    icon: UserCog,  resources: ['user:mickael', 'user:sarah', 'user:thomas'] },
  endpoint_published: { label: 'Endpoint publié',                 icon: Upload,   resources: ['endpoint:create-payment', 'endpoint:refund', 'endpoint:get-balance'] },
  doc_restored:       { label: 'Documentation restaurée',         icon: FileText, resources: ['doc:getting-started', 'doc:api-reference', 'doc:webhooks'] },
  github_updated:     { label: 'Intégration GitHub mise à jour',  icon: GithubIcon, resources: ['github:shoya-labs'] },
  token_rotated:      { label: 'Jeton API renouvelé',             icon: KeyRound, resources: ['token:sk_live_***'] },
  access_changed:     { label: "Accès au projet modifié",         icon: Users,    resources: ['project:novapay', 'project:shoya-core', 'project:shoya-wallet'] },
};

export const RESULTS = {
  success: { label: 'Succès',        tone: 'accent', icon: Check },
  warning: { label: 'Avertissement', tone: 'admin',  icon: AlertTriangle },
  failed:  { label: 'Échec',         tone: 'danger', icon: X },
};

export const AUDIT_USERS = [
  { id: 'mickael', name: 'Mickael Fanomezantsoa', role: 'Administrateur' },
  { id: 'sarah',   name: 'Sarah Ramiandrisoa',    role: 'Lead développeur' },
  { id: 'rina',    name: 'Rina Andriamifidy',     role: 'Développeur' },
  { id: 'thomas',  name: 'Thomas Razafindrakoto', role: 'Administrateur' },
  { id: 'unknown', name: 'Inconnu',               role: '—' },
];

export const AUDIT_PROJECTS = ['Shoya Wallet', 'NovaPay', 'shoya_core'];

const IPS = ['192.168.1.45', '102.176.45.23', '41.234.12.87', '154.6.23.11'];
const SUSPICIOUS_IP = '185.199.110.42';

/** Données de démonstration déterministes : à remplacer par votre API. */
export function generateAuditEvents(count = 247, now = Date.now()) {
  let seed = 42;
  const rand = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];

  const actionKeys = Object.keys(ACTIONS);
  const knownUsers = AUDIT_USERS.filter((u) => u.id !== 'unknown');
  const unknownUser = AUDIT_USERS[AUDIT_USERS.length - 1];
  let t = now - 20 * 60 * 1000;

  return Array.from({ length: count }, (_, i) => {
    t -= (15 + Math.floor(rand() * 60)) * 60 * 1000;
    const actionKey = pick(actionKeys);
    const suspicious = actionKey === 'role_changed' && rand() < 0.25;
    const user = suspicious ? unknownUser : pick(knownUsers);

    let result = 'success';
    if (suspicious) result = 'failed';
    else if (actionKey === 'token_rotated') result = rand() < 0.6 ? 'warning' : 'success';
    else if (rand() < 0.04) result = 'failed';

    return {
      id: `evt-${String(count - i).padStart(4, '0')}`,
      time: t,
      actionKey,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      resource: suspicious ? 'user:unknown' : pick(ACTIONS[actionKey].resources),
      project: pick(AUDIT_PROJECTS),
      ip: suspicious ? SUSPICIOUS_IP : pick(IPS),
      result,
    };
  });
}

const pad = (n) => String(n).padStart(2, '0');
export const formatTimestamp = (ms) => {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

/* ───── Options de filtres ───── */
const withIcon = (options, icon) => options.map((o) => ({ ...o, icon }));

export const USER_FILTER = withIcon(
  [{ value: '', label: 'Tous les utilisateurs' }, ...AUDIT_USERS.map((u) => ({ value: u.id, label: u.name }))],
  User
);
export const ACTION_FILTER = withIcon(
  [{ value: '', label: 'Toutes les actions' }, ...Object.entries(ACTIONS).map(([value, a]) => ({ value, label: a.label }))],
  Zap
);
export const PROJECT_FILTER = withIcon(
  [{ value: '', label: 'Tous les projets' }, ...AUDIT_PROJECTS.map((p) => ({ value: p, label: p }))],
  Layers
);
export const RANGE_FILTER = withIcon(
  [
    { value: 'day', label: 'Dernières 24 heures' },
    { value: 'week', label: '7 derniers jours' },
    { value: 'month', label: '30 derniers jours' },
    { value: 'all', label: 'Toute la période' },
  ],
  Calendar
);
export const RESULT_FILTER = withIcon(
  [{ value: '', label: 'Tous les résultats' }, ...Object.entries(RESULTS).map(([value, r]) => ({ value, label: r.label }))],
  Shield
);

const DAY = 24 * 60 * 60 * 1000;
export const RANGE_MS = { day: DAY, week: 7 * DAY, month: 30 * DAY, all: Infinity };
