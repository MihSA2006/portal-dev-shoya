/**
 * Stockage des modifications d'endpoints (localStorage), sans Provider.
 * Forme : { [projectId]: { [endpointSlug]: { endpoint, details, updatedAt } } }
 * Les données d'origine restent intactes : on superpose simplement les modifications.
 */
const KEY = 'shoya-endpoint-edits';

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
};

let state = load();
const listeners = new Set();

const persist = () => {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* stockage indisponible */ }
};
const emit = () => listeners.forEach((l) => l());

export const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const getSnapshot = () => state;

export function saveEndpointEdit(projectId, slug, edit) {
  state = {
    ...state,
    [projectId]: { ...(state[projectId] ?? {}), [slug]: { ...edit, updatedAt: Date.now() } },
  };
  persist();
  emit();
}

export function clearEndpointEdit(projectId, slug) {
  const project = { ...(state[projectId] ?? {}) };
  delete project[slug];
  state = { ...state, [projectId]: project };
  persist();
  emit();
}
