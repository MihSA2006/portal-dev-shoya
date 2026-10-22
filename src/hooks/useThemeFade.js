import { useEffect } from 'react';

/**
 * Ajoute la classe `is-theme-fading` à l'élément pendant ~0,9 s à chaque changement de thème.
 * Le MutationObserver s'exécute avant le calcul des styles : la classe est donc déjà là quand les
 * couleurs changent, et les transitions CSS (index.login.css) s'appliquent. Hors changement de thème,
 * aucune transition n'est imposée (les survols restent rapides).
 */
export default function useThemeFade(ref, duration = 900) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let timer;
    const observer = new MutationObserver(() => {
      el.classList.add('is-theme-fading');
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove('is-theme-fading'), duration);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'], subtree: true });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [ref, duration]);
}
