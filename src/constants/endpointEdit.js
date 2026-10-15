export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
export const METHOD_OPTIONS = HTTP_METHODS.map((m) => ({ value: m, label: m }));

export const STATUS_META = {
  active:     { label: 'Actif',     tone: 'accent' },
  draft:      { label: 'Brouillon', tone: 'lead' },
  deprecated: { label: 'Obsolète',  tone: 'admin' },
};
export const STATUS_OPTIONS = Object.entries(STATUS_META).map(([value, s]) => ({ value, label: s.label }));

export const VERSION_OPTIONS = ['v1', 'v2', 'v3'].map((v) => ({ value: v, label: v }));

export const AUTH_TYPES = ['Bearer Token', 'API Key', 'OAuth 2.0', 'Basic Auth', 'Aucune'];
export const AUTH_OPTIONS = AUTH_TYPES.map((a) => ({ value: a, label: a }));

export const TYPE_OPTIONS = ['string', 'number', 'integer', 'boolean', 'object', 'array'].map((t) => ({ value: t, label: t }));

export const RESPONSE_STATUS_OPTIONS = [
  { value: 200, label: '200 · OK' },
  { value: 201, label: '201 · Créé' },
  { value: 202, label: '202 · Accepté' },
  { value: 204, label: '204 · Aucun contenu' },
];

/** Ajoute la valeur actuelle aux options si elle n'y figure pas (données existantes hors liste). */
export const withCurrent = (options, current) =>
  current === undefined || current === null || current === '' || options.some((o) => o.value === current)
    ? options
    : [...options, { value: current, label: String(current) }];

export const BODY_FORMATS = [
  { id: 'json', label: 'application/json' },
  { id: 'form-data', label: 'multipart/form-data' },
];
