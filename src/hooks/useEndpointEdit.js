import { useCallback, useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, saveEndpointEdit, clearEndpointEdit } from '../utils/endpointEdits';

const EMPTY = {};

/** Modification enregistrée d'un endpoint + fonctions pour l'enregistrer / la supprimer. */
export default function useEndpointEdit(projectId, slug) {
  const all = useSyncExternalStore(subscribe, getSnapshot);
  const edit = all[projectId]?.[slug] ?? null;

  const save = useCallback((value) => saveEndpointEdit(projectId, slug, value), [projectId, slug]);
  const reset = useCallback(() => clearEndpointEdit(projectId, slug), [projectId, slug]);

  return { edit, save, reset };
}

/** Toutes les modifications d'un projet ({ [slug]: edit }) : utile pour les listes (sidebar, vue d'ensemble). */
export function useProjectEndpointEdits(projectId) {
  const all = useSyncExternalStore(subscribe, getSnapshot);
  return all[projectId] ?? EMPTY;
}
