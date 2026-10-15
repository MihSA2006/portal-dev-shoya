import { sampleFor } from './bodyExamples';
import { STATUS_META } from '../constants/endpointEdit';

let counter = 0;
export const uid = () => `r${Date.now().toString(36)}${(counter++).toString(36)}`;

export const newHeader = () => ({ id: uid(), name: '', type: 'string', required: false });
export const newField = () => ({ id: uid(), name: '', type: 'string', required: false, description: '', example: '' });
export const newError = () => ({ id: uid(), code: '', title: '', description: '' });

/* ───────── Valeurs d'exemple ───────── */
export const stringifyExample = (value) => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

/** { ok, value } : value vaut undefined quand le champ est vide. */
export function parseExample(type, text) {
  const t = String(text ?? '').trim();
  if (t === '') return { ok: true, value: undefined };

  switch (type) {
    case 'number':
    case 'integer': {
      const n = Number(t);
      return Number.isNaN(n) ? { ok: false } : { ok: true, value: n };
    }
    case 'boolean':
      return t === 'true' || t === 'false' ? { ok: true, value: t === 'true' } : { ok: false };
    case 'object':
    case 'array':
      try {
        const v = JSON.parse(t);
        const shapeOk = type === 'array' ? Array.isArray(v) : v !== null && typeof v === 'object' && !Array.isArray(v);
        return shapeOk ? { ok: true, value: v } : { ok: false };
      } catch {
        return { ok: false };
      }
    default:
      return { ok: true, value: String(text) };
  }
}

/** Exemple de corps généré à partir des champs (champs requis toujours présents). */
export function buildBodyExample(fields) {
  const example = {};
  fields.forEach((f) => {
    const name = f.name.trim();
    if (!name) return;
    const parsed = parseExample(f.type, f.example);
    if (parsed.ok && parsed.value !== undefined) example[name] = parsed.value;
    else if (f.required) example[name] = sampleFor(f.type);
  });
  return example;
}

/* ───────── Fusion des modifications enregistrées ───────── */
export function mergeDetails(base, patch) {
  if (!patch) return base;
  return {
    ...base,
    ...patch,
    response: { ...(base.response ?? {}), ...(patch.response ?? {}) },
    body: patch.body === null ? null : patch.body ? { ...(base.body ?? {}), ...patch.body } : base.body,
  };
}

export function applyEdit(baseEndpoint, baseDetails, edit) {
  if (!edit) return { endpoint: baseEndpoint, details: baseDetails };
  return {
    endpoint: { ...baseEndpoint, ...edit.endpoint },
    details: mergeDetails(baseDetails, edit.details),
  };
}

/* ───────── Données → brouillon ───────── */
export function toDraft(endpoint, details) {
  const body = details.body;
  return {
    name: endpoint.name ?? '',
    method: endpoint.method ?? 'GET',
    path: endpoint.path ?? '',
    status: STATUS_META[endpoint.status] ? endpoint.status : 'active',
    version: endpoint.version ?? 'v1',
    description: details.description ?? '',
    auth: details.auth ?? 'Bearer Token',
    permission: details.permission ?? '',
    headers: (details.headers ?? []).map((h) => ({
      id: uid(),
      name: h.name,
      type: h.type ?? 'string',
      required: !!h.required,
      example: h.example ?? '',
    })),
    hasBody: !!body,
    fields: (body?.fields ?? []).map((f) => ({
      id: uid(),
      name: f.name,
      type: f.type ?? 'string',
      required: !!f.required,
      description: f.description ?? '',
      example: stringifyExample(f.example !== undefined ? f.example : body?.example?.[f.name]),
    })),
    responseStatus: Number(details.response?.status) || 200,
    responseExample: details.response?.example ? JSON.stringify(details.response.example, null, 2) : '',
    notes: [...(details.notes ?? [])],
    errorList: (details.errors ?? []).map((e) => ({
      id: uid(),
      code: String(e.code ?? ''),
      title: e.title ?? '',
      description: e.description ?? '',
    })),
  };
}

/* ───────── Brouillon → données ───────── */
export function fromDraft(draft) {
  const fields = draft.fields
    .filter((f) => f.name.trim())
    .map((f) => {
      const parsed = parseExample(f.type, f.example);
      const field = { name: f.name.trim(), type: f.type, required: !!f.required };
      if (f.description.trim()) field.description = f.description.trim();
      if (parsed.ok && parsed.value !== undefined) field.example = parsed.value;
      return field;
    });

  let responseExample = null;
  const text = draft.responseExample.trim();
  if (text) {
    try { responseExample = JSON.parse(text); } catch { responseExample = null; }
  }

  return {
    endpoint: {
      name: draft.name.trim(),
      method: draft.method,
      path: draft.path.trim(),
      status: draft.status,
      version: draft.version,
    },
    details: {
      description: draft.description.trim() || null,
      auth: draft.auth,
      permission: draft.permission.trim(),
      headers: draft.headers
        .filter((h) => h.name.trim())
        .map((h) => ({
          name: h.name.trim(),
          type: h.type,
          required: !!h.required,
          ...(h.example ? { example: h.example } : {}),
        })),
      body: draft.hasBody ? { fields, example: buildBodyExample(draft.fields) } : null,
      response: { status: Number(draft.responseStatus) || 200, example: responseExample },
      notes: draft.notes.map((n) => n.trim()).filter(Boolean),
      errors: draft.errorList
        .filter((e) => String(e.code).trim() || e.title.trim())
        .map((e) => ({ code: Number(e.code), title: e.title.trim(), description: e.description.trim() })),
    },
  };
}

/** Aperçu en direct : endpoint + détails tels qu'ils seraient après enregistrement. */
export function draftToView(draft, baseEndpoint, baseDetails) {
  const { endpoint, details } = fromDraft(draft);
  return {
    endpoint: { ...baseEndpoint, ...endpoint },
    details: mergeDetails(baseDetails, details),
  };
}

export const isDraftDirty = (a, b) => JSON.stringify(a) !== JSON.stringify(b);

/* ───────── Validation ───────── */
export function validateDraft(d) {
  const issues = {};

  if (!d.name.trim()) issues.name = 'Le titre est requis.';

  const path = d.path.trim();
  if (!path) issues.path = 'Le chemin est requis.';
  else if (!path.startsWith('/')) issues.path = 'Le chemin doit commencer par « / ».';
  else if (/\s/.test(path)) issues.path = "Le chemin ne doit pas contenir d'espaces.";

  const headerNames = new Set();
  d.headers.forEach((h) => {
    const n = h.name.trim().toLowerCase();
    if (!n) issues[`header:${h.id}`] = "Le nom de l'en-tête est requis.";
    else if (headerNames.has(n)) issues[`header:${h.id}`] = 'En-tête en double.';
    headerNames.add(n);
  });

  if (d.hasBody) {
    const fieldNames = new Set();
    d.fields.forEach((f) => {
      const n = f.name.trim();
      if (!n) issues[`field:${f.id}:name`] = 'Le nom est requis.';
      else if (fieldNames.has(n)) issues[`field:${f.id}:name`] = 'Paramètre en double.';
      fieldNames.add(n);

      if (!parseExample(f.type, f.example).ok) {
        issues[`field:${f.id}:example`] = `Valeur invalide pour le type « ${f.type} ».`;
      }
    });
  }

  const text = d.responseExample.trim();
  if (text) {
    try { JSON.parse(text); } catch { issues.responseExample = "L'exemple de réponse n'est pas un JSON valide."; }
  }

  const codes = new Set();
  d.errorList.forEach((e) => {
    const code = String(e.code).trim();
    if (!/^[1-5]\d\d$/.test(code)) issues[`error:${e.id}:code`] = 'Code HTTP entre 100 et 599.';
    else if (codes.has(code)) issues[`error:${e.id}:code`] = 'Code en double.';
    codes.add(code);
    if (!e.title.trim()) issues[`error:${e.id}:title`] = 'Le titre est requis.';
  });

  return issues;
}

/* ───────── Complétude ───────── */
export function getCompleteness(d) {
  const filled = (s) => String(s ?? '').trim().length > 0;
  const fieldsOk = !d.hasBody || (d.fields.length > 0 && d.fields.every((f) => filled(f.name)));
  const requestExampleOk = !d.hasBody || (d.fields.length > 0 && d.fields.every((f) => !f.required || filled(f.example)));

  const checks = [
    { id: 'title', label: 'Titre', ok: filled(d.name) },
    { id: 'method', label: 'Méthode HTTP', ok: !!d.method },
    { id: 'path', label: 'Chemin', ok: d.path.trim().startsWith('/') && !/\s/.test(d.path) },
    { id: 'description', label: 'Description', ok: d.description.trim().length >= 10 },
    { id: 'auth', label: 'Authentification', ok: d.auth === 'Aucune' || (filled(d.auth) && filled(d.permission)) },
    { id: 'params', label: 'Paramètres', ok: d.headers.length > 0 && fieldsOk },
    { id: 'request-example', label: 'Exemple de requête', ok: requestExampleOk },
    { id: 'response', label: 'Exemple de réponse', ok: filled(d.responseExample) || Number(d.responseStatus) === 204 },
    { id: 'errors', label: "Réponses d'erreur", ok: d.errorList.length > 0 },
  ];

  const passed = checks.filter((c) => c.ok).length;
  return { score: Math.round((passed / checks.length) * 100), checks };
}
