/** Couleurs des cartes projet, attribuées selon la position dans la liste (vert, bleu, violet). */
export const CARD_TONES = ['accent', 'lead', 'doc'];

export const METHOD_TONES = {
  GET: 'dev',
  POST: 'lead',
  PUT: 'doc',
  PATCH: 'admin',
  DELETE: 'danger',
};

/** Données de démonstration : à remplacer par votre API. `minutes` = ancienneté. */
export const RECENTLY_UPDATED = [
  { id: 'u1', method: 'GET', path: '/wallet/balance', projectId: 1, minutes: 2 },
  { id: 'u2', method: 'POST', path: '/transactions', projectId: 2, minutes: 4 },
  { id: 'u3', method: 'PUT', path: '/users/profile', projectId: 3, minutes: 7 },
  { id: 'u4', method: 'GET', path: '/payments/history', projectId: 2, minutes: 12 },
  { id: 'u5', method: 'POST', path: '/auth/login', projectId: 1, minutes: 18 },
  { id: 'u6', method: 'GET', path: '/system/health', projectId: 3, minutes: 24 },
  { id: 'u7', method: 'DELETE', path: '/users/{id}', projectId: 3, minutes: 32 },
  { id: 'u8', method: 'GET', path: '/webhooks/events', projectId: 2, minutes: 41 },
];

export const RECENTLY_VIEWED = [
  { id: 'v1', method: 'GET', path: '/wallet/transactions', projectId: 1, version: 'v2', minutes: 2 },
  { id: 'v2', method: 'POST', path: '/payments/create', projectId: 2, version: 'v2', minutes: 6 },
  { id: 'v3', method: 'GET', path: '/users/profile', projectId: 3, version: 'v1', minutes: 10 },
  { id: 'v4', method: 'PUT', path: '/settings', projectId: 1, version: 'v2', minutes: 15 },
  { id: 'v5', method: 'GET', path: '/status', projectId: 3, version: 'v1', minutes: 22 },
  { id: 'v6', method: 'POST', path: '/auth/refresh', projectId: 2, version: 'v2', minutes: 28 },
];
