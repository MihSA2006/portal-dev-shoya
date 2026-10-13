export const HEALTH_STATUS = {
  operational: { label: 'Opérationnel', tone: 'accent' },
  degraded: { label: 'Dégradé', tone: 'admin' },
  down: { label: 'Hors service', tone: 'danger' },
  unknown: { label: 'Non configuré', tone: 'muted' },
};

export const OVERALL_LABEL = {
  operational: 'Tous les systèmes opérationnels',
  degraded: 'Performances dégradées',
  down: 'Incident en cours',
  unknown: 'Statut indisponible',
};

/** Périodes du graphique. `days` multiplie les totaux ; `labels` = repères de l'axe X. */
export const RANGES = [
  { id: '24h', label: 'Dernières 24 h', days: 1, length: 25, labels: ['00:00', '06:00', '12:00', '18:00', '24:00'] },
  { id: '7d', label: '7 derniers jours', days: 7, length: 28, labels: ['J-7', 'J-5', 'J-3', 'J-1', "Aujourd'hui"] },
  { id: '30d', label: '30 derniers jours', days: 30, length: 30, labels: ['J-30', 'J-22', 'J-15', 'J-7', "Aujourd'hui"] },
];

/**
 * Données de la vue d'ensemble par projet (clé = id du projet). DÉMONSTRATION : à remplacer par votre API.
 * - deployMinutes : ancienneté du dernier déploiement
 * - inReview      : endpoints dont la documentation est en relecture
 * - health        : état et latence par environnement (local | staging | production)
 * - quickStart    : requête d'exemple (si absent : premier endpoint du catalogue)
 * - requests      : trafic (deltas en %, avgDelta < 0 = plus rapide)
 * - changes       : derniers changements ; tone = accent | lead | doc
 */
export const OVERVIEW_BY_PROJECT = {
  1: {
    deployMinutes: 14,
    openPRs: 2,
    inReview: 2,
    health: {
      local: { status: 'operational', latency: '< 40 ms' },
      staging: { status: 'operational', latency: '< 110 ms' },
      production: { status: 'operational', latency: '< 180 ms' },
    },
    quickStart: { method: 'POST', path: '/wallet/transfers', body: '{"amount": 2500, "currency": "MGA", "to": "wal_456"}' },
    requests: { total: 18240, successRate: 99.5, avgMs: 118, totalDelta: 9, successDelta: 0.2, avgDelta: -12, peak: 3200 },
    changes: [
      { id: 'c1', text: 'Ajout du transfert entre portefeuilles', minutes: 95, tone: 'accent' },
      { id: 'c2', text: 'Mise à jour de la réponse du solde', minutes: 420, tone: 'lead' },
      { id: 'c3', text: 'Dépréciation de l\u2019ancien endpoint de paramètres', minutes: 2880, tone: 'doc' },
    ],
  },
  2: {
    deployMinutes: 8,
    openPRs: 3,
    inReview: 3,
    health: {
      local: { status: 'operational', latency: '< 50 ms' },
      staging: { status: 'operational', latency: '< 120 ms' },
      production: { status: 'operational', latency: '< 200 ms' },
    },
    quickStart: { method: 'POST', path: '/payments', body: '{"amount": 1000, "currency": "USD", "customer_id": "cus_123"}' },
    requests: { total: 12482, successRate: 99.2, avgMs: 142, totalDelta: 12, successDelta: 0.4, avgDelta: -18, peak: 2100 },
    changes: [
      { id: 'c1', text: 'Ajout de l\u2019endpoint de remboursement', minutes: 120, tone: 'accent' },
      { id: 'c2', text: 'Mise à jour de la réponse des transactions', minutes: 300, tone: 'lead' },
      { id: 'c3', text: 'Dépréciation de l\u2019ancien endpoint client', minutes: 1440, tone: 'doc' },
    ],
  },
  3: {
    deployMinutes: 45,
    openPRs: 1,
    inReview: 3,
    health: {
      local: { status: 'operational', latency: '< 30 ms' },
      staging: { status: 'degraded', latency: '< 260 ms' },
    },
    quickStart: { method: 'GET', path: '/system/health', body: null },
    requests: { total: 7310, successRate: 98.4, avgMs: 176, totalDelta: 4, successDelta: -0.3, avgDelta: 6, peak: 1200 },
    changes: [
      { id: 'c1', text: 'Ajout du contrôle d\u2019état du système', minutes: 240, tone: 'accent' },
      { id: 'c2', text: 'Mise à jour du schéma du profil', minutes: 1500, tone: 'lead' },
    ],
  },
};

/** Valeurs par défaut (projet sans données d'exploitation). */
export const EMPTY_OVERVIEW = {
  deployMinutes: null,
  openPRs: 0,
  inReview: 0,
  health: {},
  quickStart: null,
  requests: null,
  changes: [],
};
