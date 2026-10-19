export const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

export const LIFECYCLE = {
  production: { label: 'En production', tone: 'accent' },
  test: { label: 'En test', tone: 'doc' },
  development: { label: 'En développement', tone: 'lead' },
  planned: { label: 'Planifié', tone: 'muted' },
  deprecated: { label: 'Déprécié', tone: 'danger' },
};

export const DOC_STATUS = {
  complete: { label: 'Complète', tone: 'accent' },
  review: { label: 'En relecture', tone: 'admin' },
  progress: { label: 'En cours', tone: 'lead' },
  incomplete: { label: 'Incomplète', tone: 'danger' },
};

const m = (lifecycle, doc, owner, minutes, version = 'v1') => ({ lifecycle, doc, owner, minutes, version });

/**
 * Métadonnées d'exploitation par endpoint, clé = "<idProjet>/<idEndpoint>". DÉMONSTRATION : à remplacer par votre API.
 * Absent d'ici : cycle de vie "planned", documentation "incomplete", responsable = responsable du projet.
 * minutes = ancienneté de la dernière mise à jour.
 */
export const ENDPOINT_META = {
  // Shoya Wallet
  '1/get-balance': m('production', 'complete', '@tiana', 12, 'v2'),
  '1/list-wallet-transactions': m('production', 'complete', '@hanitra', 95, 'v2'),
  '1/create-transfer': m('test', 'review', '@tiana', 240, 'v2'),
  '1/login': m('production', 'complete', '@mickael', 1440, 'v1'),
  '1/refresh-token': m('production', 'complete', '@mickael', 2880, 'v1'),
  '1/get-settings': m('production', 'progress', '@hanitra', 600, 'v2'),
  '1/update-settings': m('development', 'progress', '@hanitra', 0, 'v2'),
  // NovaPay
  '2/list-payments': m('production', 'complete', '@mickael', 2, 'v2'),
  '2/get-payment': m('production', 'complete', '@mickael', 7, 'v2'),
  '2/create-payment': m('production', 'complete', '@mickael', 4, 'v2'),
  '2/cancel-payment': m('test', 'review', '@tiana', 180, 'v2'),
  '2/list-customers': m('production', 'complete', '@hanitra', 360, 'v2'),
  '2/create-customer': m('production', 'complete', '@hanitra', 420, 'v2'),
  '2/update-customer': m('development', 'progress', '@tiana', 30, 'v2'),
  '2/list-transactions': m('production', 'complete', '@mickael', 300, 'v2'),
  '2/get-transaction': m('production', 'complete', '@mickael', 310, 'v2'),
  '2/create-refund': m('test', 'review', '@tiana', 120, 'v2'),
  '2/get-refund': m('test', 'incomplete', '@tiana', 125, 'v2'),
  '2/list-webhook-events': m('production', 'complete', '@hanitra', 41, 'v1'),
  '2/create-webhook': m('production', 'progress', '@hanitra', 1500, 'v1'),
  '2/delete-webhook': m('deprecated', 'incomplete', '@hanitra', 20160, 'v1'),
  // shoya_core
  '3/get-profile': m('production', 'complete', '@hanitra', 10, 'v1'),
  '3/update-profile': m('production', 'complete', '@hanitra', 7, 'v1'),
  '3/delete-user': m('deprecated', 'incomplete', '@mickael', 1920, 'v1'),
  '3/login': m('production', 'complete', '@mickael', 18, 'v1'),
  '3/refresh-token': m('production', 'review', '@mickael', 60, 'v1'),
  '3/health': m('production', 'complete', '@tiana', 24, 'v1'),
  '3/status': m('planned', 'incomplete', '@tiana', 1440, 'v1'),
};
