import LoginForm from './LoginForm';
import LoginMark from './LoginMark';

/** Carte en verre aux coins biseautés (le cadre est dessiné en CSS : .login-card). */
const LoginCard = () => (
  <div className="login-card-wrap w-full">
    <div className="login-card">
      <span aria-hidden="true" className="chamfer-ring pointer-events-none absolute inset-3.5" />

      <div className="relative space-y-9 px-7 pb-8 pt-12 sm:space-y-10 sm:px-10 sm:pb-9 sm:pt-14">
        <header className="animate-enter space-y-3 text-center">
          <div className="flex justify-center"><LoginMark size={50} /></div>
          <h1 className="font-display text-3xl font-medium">Bon retour</h1>
          <p className="text-sm text-[var(--text-soft)]">Connectez-vous à votre compte Shoya Labs</p>
        </header>

        <div className="animate-enter" style={{ animationDelay: '90ms' }}>
          <LoginForm />
        </div>

        <footer className="pt-2 text-center">
          <svg viewBox="0 0 460 26" preserveAspectRatio="none" className="h-5 w-full" aria-hidden="true">
            <path d="M0 24H78L106 3H354L382 24H460" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--login-line)' }} />
          </svg>
          <p className="-mt-1 flex items-center justify-center gap-3 text-xs text-[var(--accent)]">
            Sécurisé <span aria-hidden="true">·</span> Privé <span aria-hidden="true">·</span> Shoya Labs
          </p>
        </footer>
      </div>
    </div>
  </div>
);

export default LoginCard;
