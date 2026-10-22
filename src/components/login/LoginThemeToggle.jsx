import { Moon, Sun } from 'lucide-react';
import * as themeModule from '../../hooks/useTheme';
import useDocumentTheme from '../../hooks/useDocumentTheme';

/*
 * ⚠️ Seul endroit qui dépend de la forme de votre hook useTheme.
 * - Il est appelé ici pour que le thème enregistré soit appliqué sur /login (hors Layout, sans Navbar).
 * - L'affichage lit le thème dans le DOM (data-theme), donc ne dépend pas de ce hook.
 * - Le basculement cherche toggle / toggleTheme / un setter (objet ou tableau). Si rien n'est
 *   reconnu, le bouton n'est pas affiché (jamais de bouton inactif) : adaptez alors `pickToggle`.
 */
const useThemeHook = themeModule.default ?? themeModule.useTheme;

const pickToggle = (api) => {
  if (!api) return null;
  const candidates = Array.isArray(api)
    ? [api[1]]
    : [api.toggle, api.toggleTheme, api.toggleMode, api.setTheme, api.setMode];
  return candidates.find((fn) => typeof fn === 'function') ?? null;
};

const LoginThemeToggle = () => {
  const api = useThemeHook?.();
  const current = useDocumentTheme();
  const toggle = pickToggle(api);

  if (!toggle) return null;

  const next = current === 'light' ? 'dark' : 'light';
  const label = next === 'light' ? 'Passer au thème clair' : 'Passer au thème sombre';

  return (
    // Conteneur positionné à part : .icon-btn définit position:relative et annulerait "absolute" sur le bouton.
    <div className="absolute right-4 top-4 z-10 sm:right-8 sm:top-6">
      <button
        type="button"
        onClick={() => toggle(next)}
        aria-label={label}
        title={label}
        className="icon-btn border border-[var(--login-field-line)] bg-[var(--login-card)] backdrop-blur-md"
      >
        {current === 'light' ? <Moon size={19} /> : <Sun size={19} />}
      </button>
    </div>
  );
};

export default LoginThemeToggle;
