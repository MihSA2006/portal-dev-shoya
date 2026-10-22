import { Lock } from 'lucide-react';
import { PORTAL_VERSION } from '../../constants/login';

const chip = 'flex items-center gap-2 border border-[var(--login-field-line)] bg-[var(--login-card)] px-3 py-1.5 text-xs text-[var(--text-soft)] backdrop-blur-md';

/** Mentions de bas de page, sur pastilles translucides (lisibles sur n'importe quel fond). */
const LoginFooter = () => (
  <footer className="flex flex-wrap items-center justify-between gap-3 px-6 pb-5 lg:px-14">
    <p className={chip}>
      <span className="font-medium text-[var(--accent)]">Shoya Labs</span>
      <span aria-hidden="true">|</span>
      Portail d'ingénierie {PORTAL_VERSION}
    </p>
    <p className={chip}><Lock size={13} /> Vos données sont protégées</p>
  </footer>
);

export default LoginFooter;
