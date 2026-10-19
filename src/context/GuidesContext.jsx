import { useCallback, useMemo, useState } from 'react';
import { INITIAL_GUIDES, starterContent } from '../constants/guides';
import { GuidesContext } from './guidesContext';

const newId = () => `g-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Source unique des guides : liste, création, enregistrement. */
export const GuidesProvider = ({ children }) => {
  const [guides, setGuides] = useState(INITIAL_GUIDES);

  /** Crée un brouillon et le renvoie (pour rediriger vers l'éditeur). */
  const createGuide = useCallback(({ projectId, title }) => {
    const guide = { id: newId(), projectId, title, status: 'draft', updatedAt: Date.now(), content: starterContent(title) };
    setGuides((list) => [guide, ...list]);
    return guide;
  }, []);

  const saveGuide = useCallback(
    (id, patch) => setGuides((list) => list.map((g) => (g.id === id ? { ...g, ...patch, updatedAt: Date.now() } : g))),
    []
  );

  const value = useMemo(() => ({ guides, createGuide, saveGuide }), [guides, createGuide, saveGuide]);
  return <GuidesContext.Provider value={value}>{children}</GuidesContext.Provider>;
};
