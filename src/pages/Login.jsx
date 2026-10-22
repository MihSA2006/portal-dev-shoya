import { useRef } from 'react';
import useThemeFade from '../hooks/useThemeFade';
import LoginBackground from '../components/login/LoginBackground';
import LoginBrand from '../components/login/LoginBrand';
import LoginCard from '../components/login/LoginCard';
import LoginFeatures from '../components/login/LoginFeatures';
import LoginFooter from '../components/login/LoginFooter';
import LoginThemeToggle from '../components/login/LoginThemeToggle';

/** Page de connexion (statique, sans logique d'authentification). Clair et sombre, avec fondu au changement de thème. */
const Login = () => {
  const rootRef = useRef(null);
  useThemeFade(rootRef);

  return (
    <div ref={rootRef} className="login-page relative isolate flex min-h-screen flex-col overflow-hidden text-[var(--text)]">
      <LoginBackground />
      <LoginThemeToggle />

      <main className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,490px)] lg:px-14">
        <section className="hidden space-y-14 lg:block" aria-label="Présentation du portail">
          <LoginBrand />
          <div className="space-y-8">
            <div className="animate-enter space-y-3">
              <p className="font-display text-4xl font-medium xl:text-5xl">
                Portail <span className="text-[var(--accent)]">d'ingénierie</span>
              </p>
              <p className="text-base text-[var(--text-soft)]">Documentation · Équipe · Avancement · Tout au même endroit</p>
            </div>
            <LoginFeatures />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[490px] space-y-8 lg:mx-0 lg:justify-self-end">
          <div className="flex justify-center lg:hidden"><LoginBrand /></div>
          <LoginCard />
        </section>
      </main>

      <LoginFooter />
    </div>
  );
};

export default Login;
