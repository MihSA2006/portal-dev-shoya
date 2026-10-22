import { useSyncExternalStore } from 'react';

const subscribe = (callback) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'], subtree: true });
  return () => observer.disconnect();
};

// Le thème clair est signalé par data-theme="light" (voir index.css) ; tout le reste = sombre.
const getSnapshot = () => (document.querySelector('[data-theme="light"]') ? 'light' : 'dark');

/** Thème affiché ('light' | 'dark'), lu dans le DOM : indépendant de la façon dont useTheme le stocke. */
export default function useDocumentTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'dark');
}
