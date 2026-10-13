export const ERROR_CATALOG = {
  400: { title: 'Requête invalide', description: 'Données de requête invalides' },
  401: { title: 'Non autorisé', description: 'Jeton manquant ou invalide' },
  403: { title: 'Interdit', description: 'Permissions insuffisantes' },
  404: { title: 'Introuvable', description: 'Ressource inexistante' },
  409: { title: 'Conflit', description: 'La ressource existe déjà' },
  429: { title: 'Trop de requêtes', description: 'Limite de débit dépassée' },
  500: { title: 'Erreur interne', description: 'Erreur inattendue du serveur' },
};

/**
 * Détails documentés d'un endpoint, clé = "<idProjet>/<idEndpoint>". DÉMONSTRATION : à remplacer par votre API / OpenAPI.
 * Tout ce qui est omis est déduit de la méthode et du chemin (voir utils/endpointDetails.js) ;
 * les sections sans contenu documenté affichent un état vide.
 *
 * Champs : description, auth, permission, headers[{name,type,required,example}],
 * body{fields[{name,type,required}], example}, response{status, example}, errors[{code, description?}],
 * notes[], meta{developer, updated (ISO), task, pr, openapiMinutes}
 */
export const ENDPOINT_DETAILS = {
  '2/create-payment': {
    description: "Crée une demande de paiement et renvoie l'objet paiement créé.",
    headers: [
      { name: 'Authorization', type: 'string', required: true, example: 'Bearer YOUR_ACCESS_TOKEN' },
      { name: 'Content-Type', type: 'string', required: true, example: 'application/json' },
      { name: 'Idempotency-Key', type: 'string', required: true, example: '7d9f3a2e-1b4c-4f8a-9c2e-6e7d8a9b0c1d' },
    ],
    body: {
      fields: [
        { name: 'amount', type: 'number', required: true },
        { name: 'currency', type: 'string', required: true },
        { name: 'customer_id', type: 'string', required: true },
        { name: 'payment_method', type: 'string', required: true },
      ],
      example: { amount: 15000, currency: 'USD', customer_id: 'cus_12345', payment_method: 'card' },
    },
    response: {
      status: 201,
      example: {
        id: 'pay_7f3a9c2e4b1d',
        amount: 15000,
        currency: 'USD',
        status: 'pending',
        customer_id: 'cus_12345',
        payment_method: 'card',
        created_at: '2026-10-06T12:34:56Z',
      },
    },
    errors: [
      { code: 400 },
      { code: 401 },
      { code: 403 },
      { code: 409, description: 'Le paiement existe déjà' },
      { code: 429 },
      { code: 500 },
    ],
    notes: ['Limite de débit : 100 requêtes/minute', 'Idempotence supportée', 'Prêt pour la production'],
    meta: { updated: '2026-10-06T12:34:00', task: 'NOVA-12', pr: '#184', openapiMinutes: 4 },
  },

  '2/get-payment': {
    description: 'Retourne un paiement à partir de son identifiant.',
    response: {
      status: 200,
      example: {
        id: 'pay_7f3a9c2e4b1d',
        amount: 15000,
        currency: 'USD',
        status: 'succeeded',
        customer_id: 'cus_12345',
        created_at: '2026-10-06T12:34:56Z',
      },
    },
    notes: ['Limite de débit : 100 requêtes/minute'],
    meta: { updated: '2026-10-02T09:10:00', task: 'NOVA-9', pr: '#171', openapiMinutes: 4 },
  },
};
