import { createContext, useContext } from 'react';

export const GuidesContext = createContext(null);

export const useGuides = () => {
  const ctx = useContext(GuidesContext);
  if (!ctx) throw new Error('useGuides doit être utilisé dans <GuidesProvider>.');
  return ctx;
};
