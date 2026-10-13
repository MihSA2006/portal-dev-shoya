// Statuts du board. L'ordre = l'ordre des colonnes.
// `tone` correspond aux [data-tone] définis dans index.css.
export const TASK_STATUSES = [
  { id: 'planned', label: 'Planifié', tone: 'muted' },
  { id: 'in_development', label: 'En développement', tone: 'lead' },
  { id: 'in_review', label: 'En revue', tone: 'doc' },
  { id: 'in_test', label: 'En test', tone: 'admin' },
  { id: 'done', label: 'Terminé', tone: 'accent' },
];

// Remplacez ces listes par vos vraies données (ProjectsContext, API utilisateurs…).
export const PROJECTS = [
  { id: 'novapay', label: 'NovaPay', key: 'NOVA' },
  { id: 'shoya-wallet', label: 'Shoya Wallet', key: 'WALLET' },
  { id: 'shoya-core', label: 'shoya_core', key: 'CORE' },
];

export const ASSIGNEES = [
  { id: 'jean', label: 'Jean Silva', role: 'Lead technique' },
  { id: 'andry', label: 'Andry K.', role: 'Développeur' },
  { id: 'rija', label: 'Rija L.', role: 'Développeur' },
  { id: 'mireille', label: 'Mireille D.', role: 'Développeuse' },
  { id: 'tiana', label: 'Tiana S.', role: 'Développeuse' },
  { id: 'david', label: 'David L.', role: 'DevOps' },
  { id: 'kevin', label: 'Kevin M.', role: 'Développeur' },
];

export const CYCLES = [
  { id: 'cycle-14', label: 'Cycle 14', duration: '6 semaines', startsAt: '2026-09-14', endsAt: '2026-10-25' },
  { id: 'cycle-13', label: 'Cycle 13', duration: '6 semaines', startsAt: '2026-08-03', endsAt: '2026-09-13' },
];

export const CURRENT_CYCLE_ID = 'cycle-14';
export const DESCRIPTION_MAX_LENGTH = 1000;

const toMap = (list) => Object.fromEntries(list.map((item) => [item.id, item]));
export const PROJECTS_BY_ID = toMap(PROJECTS);
export const ASSIGNEES_BY_ID = toMap(ASSIGNEES);

const ago = (hours) => Date.now() - hours * 3_600_000;

const BASE_TASKS = [
  { id: 't1', key: 'NOVA-18', title: 'Implémenter le système de notifications utilisateur', description: "Envoyer des notifications push et e-mail lors des changements de statut d'un paiement, avec préférences par utilisateur et file d'attente de réessai.", status: 'planned', projectId: 'novapay', assigneeId: 'jean', cycleId: 'cycle-14', createdAt: ago(48), unread: true },
  { id: 't2', key: 'WALLET-32', title: "Ajouter l'export de l'historique des transactions (CSV/PDF)", description: 'Permettre à un utilisateur de télécharger ses transactions filtrées par période.', status: 'planned', projectId: 'shoya-wallet', assigneeId: 'mireille', cycleId: 'cycle-14', createdAt: ago(72), unread: false },
  { id: 't3', key: 'NOVA-12', title: 'Implémenter le endpoint de création de paiement', description: "Valider le payload, créer la transaction en base, renvoyer un identifiant d'idempotence et gérer les erreurs de montant et de devise.", status: 'in_development', projectId: 'novapay', assigneeId: 'andry', cycleId: 'cycle-14', createdAt: ago(50), unread: true },
  { id: 't4', key: 'CORE-14', title: 'Optimiser les requêtes de pagination des utilisateurs', description: 'Passer de la pagination par offset à la pagination par curseur.', status: 'in_development', projectId: 'shoya-core', assigneeId: 'tiana', cycleId: 'cycle-14', createdAt: ago(5), unread: false },
  { id: 't5', key: 'NOVA-21', title: 'Implémenter le service de validation des paiements', description: 'Vérifier la signature, le solde disponible et les plafonds avant autorisation.', status: 'in_review', projectId: 'novapay', assigneeId: 'rija', cycleId: 'cycle-14', createdAt: ago(4), unread: false },
  { id: 't6', key: 'NOVA-17', title: 'Configurer le pipeline CI/CD', description: 'Lint, tests et déploiement automatique sur la préproduction.', status: 'done', projectId: 'novapay', assigneeId: 'david', cycleId: 'cycle-14', createdAt: ago(24), unread: false },
  { id: 't7', key: 'NOVA-20', title: 'Ajouter le gestionnaire de webhooks de paiement', description: 'Recevoir les événements du prestataire, vérifier leur authenticité et mettre à jour les transactions.', status: 'done', projectId: 'novapay', assigneeId: 'kevin', cycleId: 'cycle-14', createdAt: ago(48), unread: false },
];

// ── Détail d'une tâche ───────────────────────────────────

export const TASKS_ROUTE = '/tasks';
export const DOCS_ROUTE = '/documentation';
export const taskPath = (id) => `${TASKS_ROUTE}/${id}`;

export const STATUSES_BY_ID = toMap(TASK_STATUSES);
export const CYCLES_BY_ID = toMap(CYCLES);

// Utilisateur connecté (à remplacer par votre contexte d'authentification).
export const CURRENT_USER_ID = 'jean';

// Seuls ces champs sont modifiables depuis TaskDetail. Les endpoints liés ne le sont jamais.
export const EDITABLE_FIELDS = ['title', 'description', 'status', 'assigneeId', 'cycleId', 'acceptanceCriteria'];
export const FIELD_LABELS = {
  title: 'titre',
  description: 'description',
  status: 'statut',
  assigneeId: 'assigné',
  cycleId: 'cycle',
  acceptanceCriteria: "critères d'acceptation",
};

export const METHOD_TONES = { GET: 'dev', POST: 'lead', PUT: 'admin', PATCH: 'admin', DELETE: 'danger' };

// Endpoints existants, créés dans la documentation : une tâche ne fait que s'y référencer.
// À remplacer par votre constants/endpoints.js ou votre API.
export const ENDPOINTS_CATALOG = [
  { id: 'ep-create-payment', method: 'POST', path: '/payments', projectId: 'novapay', docProgress: 82 },
  { id: 'ep-get-payment', method: 'GET', path: '/payments/{id}', projectId: 'novapay', docProgress: 64 },
  { id: 'ep-validate-payment', method: 'POST', path: '/payments/validate', projectId: 'novapay', docProgress: 40 },
  { id: 'ep-webhook', method: 'POST', path: '/payments/webhook', projectId: 'novapay', docProgress: 100 },
  { id: 'ep-list-users', method: 'GET', path: '/users', projectId: 'shoya-core', docProgress: 90 },
];
export const ENDPOINTS_BY_ID = toMap(ENDPOINTS_CATALOG);

const criteria = (...items) => items.map(([text, done], i) => ({ id: `c${i}-${text.length}`, text, done }));

const DETAILS = {
  t3: {
    endpointIds: ['ep-create-payment', 'ep-get-payment'],
    acceptanceCriteria: criteria(
      ['Un paiement peut être créé avec des données valides', true],
      ['La validation des entrées est correctement implémentée', true],
      ['Le paiement est enregistré en base de données', true],
      ['Le format de réponse approprié est renvoyé (201)', false],
      ["Les erreurs de données invalides et d'erreurs système sont gérées", false],
    ),
    github: {
      repo: 'shoya-labs/novapay',
      branch: 'NOVA-12-payment-creation',
      pr: { number: 184, state: 'open' },
      commits: 12,
      lastActivityAt: ago(0.4),
      syncedAt: ago(0.4),
    },
    timeline: [
      { id: 'e1', type: 'created', title: 'Tâche créée', detail: 'NOVA-12 — Implémenter le endpoint de création de paiement', by: 'jean', at: ago(50) },
      { id: 'e2', type: 'branch', title: 'Branche créée', detail: 'NOVA-12-payment-creation', by: 'andry', at: ago(49) },
      { id: 'e3', type: 'commit', title: 'Premier commit', detail: 'Implémentation initiale de la création de paiement', by: 'andry', at: ago(26) },
      { id: 'e4', type: 'pr', title: 'Pull request ouverte', detail: '#184 — Implémenter la création de paiement', by: 'andry', at: ago(0.4) },
      { id: 'e5', type: 'docs', title: 'Documentation mise à jour', detail: 'Documentation du endpoint de paiement (82 %)', by: 'andry', at: ago(0.4) },
    ],
  },
  t4: { endpointIds: ['ep-list-users'] },
  t5: {
    endpointIds: ['ep-validate-payment'],
    acceptanceCriteria: criteria(['La signature est vérifiée', true], ['Les plafonds sont contrôlés avant autorisation', false]),
    github: { repo: 'shoya-labs/novapay', branch: 'NOVA-21-payment-validation', pr: { number: 190, state: 'open' }, commits: 7, lastActivityAt: ago(4), syncedAt: ago(1) },
  },
  t7: {
    endpointIds: ['ep-webhook'],
    github: { repo: 'shoya-labs/novapay', branch: 'NOVA-20-webhook-handler', pr: { number: 171, state: 'merged' }, commits: 9, lastActivityAt: ago(48), syncedAt: ago(2) },
  },
};

const enrich = (task) => {
  const details = DETAILS[task.id] ?? {};
  const base = { createdBy: 'jean', starred: false, acceptanceCriteria: [], endpointIds: [], github: null, ...details };
  const timeline = details.timeline ?? [
    { id: `${task.id}-created`, type: 'created', title: 'Tâche créée', detail: `${task.key} — ${task.title}`, by: base.createdBy, at: task.createdAt },
  ];
  return { ...task, ...base, timeline };
};

export const INITIAL_TASKS = BASE_TASKS.map(enrich);