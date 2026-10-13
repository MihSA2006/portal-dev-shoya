/**
 * Catalogue d'endpoints par projet (clé = id du projet), regroupés par catégorie.
 * Données de démonstration : à remplacer par votre API. Un projet absent d'ici n'a aucun endpoint.
 * `icon` : clé de ICONS dans components/documentation/project/ProjectNavGroup.jsx.
 * L'`id` d'un endpoint doit être unique dans son projet (il sert dans l'URL).
 */
const ep = (id, name, method, path) => ({ id, name, method, path });

export const ENDPOINTS_BY_PROJECT = {
  // Shoya Wallet
  1: [
    { id: 'wallet', name: 'Portefeuille', icon: 'wallet', endpoints: [
      ep('get-balance', 'Consulter le solde', 'GET', '/wallet/balance'),
      ep('list-wallet-transactions', 'Lister les transactions', 'GET', '/wallet/transactions'),
      ep('create-transfer', 'Créer un transfert', 'POST', '/wallet/transfers'),
    ] },
    { id: 'auth', name: 'Authentification', icon: 'key', endpoints: [
      ep('login', 'Connexion', 'POST', '/auth/login'),
      ep('refresh-token', 'Renouveler le jeton', 'POST', '/auth/refresh'),
    ] },
    { id: 'settings', name: 'Paramètres', icon: 'settings', endpoints: [
      ep('get-settings', 'Lire les paramètres', 'GET', '/settings'),
      ep('update-settings', 'Modifier les paramètres', 'PUT', '/settings'),
    ] },
  ],
  // NovaPay
  2: [
    { id: 'payments', name: 'Paiements', icon: 'card', endpoints: [
      ep('list-payments', 'Lister les paiements', 'GET', '/payments'),
      ep('get-payment', 'Consulter un paiement', 'GET', '/payments/{id}'),
      ep('create-payment', 'Créer un paiement', 'POST', '/payments'),
      ep('cancel-payment', 'Annuler un paiement', 'POST', '/payments/{id}/cancel'),
    ] },
    { id: 'customers', name: 'Clients', icon: 'user', endpoints: [
      ep('list-customers', 'Lister les clients', 'GET', '/customers'),
      ep('create-customer', 'Créer un client', 'POST', '/customers'),
      ep('update-customer', 'Modifier un client', 'PUT', '/customers/{id}'),
    ] },
    { id: 'transactions', name: 'Transactions', icon: 'transfer', endpoints: [
      ep('list-transactions', 'Lister les transactions', 'GET', '/transactions'),
      ep('get-transaction', 'Consulter une transaction', 'GET', '/transactions/{id}'),
    ] },
    { id: 'refunds', name: 'Remboursements', icon: 'history', endpoints: [
      ep('create-refund', 'Créer un remboursement', 'POST', '/refunds'),
      ep('get-refund', 'Consulter un remboursement', 'GET', '/refunds/{id}'),
    ] },
    { id: 'webhooks', name: 'Webhooks', icon: 'webhook', endpoints: [
      ep('list-webhook-events', 'Lister les événements', 'GET', '/webhooks/events'),
      ep('create-webhook', 'Créer un webhook', 'POST', '/webhooks'),
      ep('delete-webhook', 'Supprimer un webhook', 'DELETE', '/webhooks/{id}'),
    ] },
  ],
  // shoya_core
  3: [
    { id: 'users', name: 'Utilisateurs', icon: 'user', endpoints: [
      ep('get-profile', 'Consulter le profil', 'GET', '/users/profile'),
      ep('update-profile', 'Modifier le profil', 'PUT', '/users/profile'),
      ep('delete-user', 'Supprimer un utilisateur', 'DELETE', '/users/{id}'),
    ] },
    { id: 'auth', name: 'Authentification', icon: 'key', endpoints: [
      ep('login', 'Connexion', 'POST', '/auth/login'),
      ep('refresh-token', 'Renouveler le jeton', 'POST', '/auth/refresh'),
    ] },
    { id: 'system', name: 'Système', icon: 'server', endpoints: [
      ep('health', 'État de santé', 'GET', '/system/health'),
      ep('status', 'Statut du service', 'GET', '/status'),
    ] },
  ],
};
