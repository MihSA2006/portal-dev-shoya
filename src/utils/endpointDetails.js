import { ENDPOINT_DETAILS, ERROR_CATALOG } from '../constants/endpointDetails';

const BODY_METHODS = ['POST', 'PUT', 'PATCH'];
const ACTIONS = { GET: 'read', POST: 'create', PUT: 'update', PATCH: 'update', DELETE: 'delete' };
const STATUS = { GET: 200, POST: 201, PUT: 200, PATCH: 200, DELETE: 204 };

/** Fusionne les détails documentés avec des valeurs déduites de la méthode et du chemin. */
export const getEndpointDetails = (project, endpoint) => {
  const custom = ENDPOINT_DETAILS[`${project.id}/${endpoint.id}`] ?? {};
  const hasBody = BODY_METHODS.includes(endpoint.method);

  const errorCodes =
    custom.errors ??
    [...(hasBody ? [400] : []), 401, 403, ...(endpoint.path.includes('{') ? [404] : []), 429, 500].map((code) => ({ code }));

  return {
    description: custom.description ?? null,
    auth: custom.auth ?? 'Bearer Token',
    permission: custom.permission ?? `${endpoint.category.id}:${ACTIONS[endpoint.method]}`,
    headers:
      custom.headers ?? [
        { name: 'Authorization', type: 'string', required: true, example: 'Bearer YOUR_ACCESS_TOKEN' },
        ...(hasBody ? [{ name: 'Content-Type', type: 'string', required: true, example: 'application/json' }] : []),
      ],
    body: custom.body ?? (hasBody ? { fields: [], example: null } : null),
    response: custom.response ?? { status: STATUS[endpoint.method], example: null },
    errors: errorCodes.map(({ code, description }) => ({
      code,
      title: ERROR_CATALOG[code].title,
      description: description ?? ERROR_CATALOG[code].description,
    })),
    notes: custom.notes ?? [],
    meta: { developer: project.docOwner, updated: null, task: null, pr: null, openapiMinutes: null, ...custom.meta },
  };
};
