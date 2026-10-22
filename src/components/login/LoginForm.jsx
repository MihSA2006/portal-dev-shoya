import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Eye, EyeOff, LoaderCircle, Lock, Mail, ShieldCheck } from 'lucide-react';
import LoginField from './LoginField';

/** Formulaire de démonstration : aucune authentification réelle n'est effectuée. */
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    window.setTimeout(() => navigate('/'), 650);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <LoginField id="login-email" label="Adresse e-mail" icon={Mail} type="email" autoComplete="username" placeholder="vous@shoyalabs.com" />

      <LoginField
        id="login-password"
        label="Mot de passe"
        icon={Lock}
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        placeholder="••••••••••"
        right={
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={showPassword}
            className="icon-btn !h-9 !w-9"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        }
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-sm">
        <label className="group flex cursor-pointer items-center gap-3 text-[var(--text-soft)]">
          <input type="checkbox" defaultChecked className="peer sr-only" />
          <span className="grid h-5 w-5 place-items-center border border-[var(--border-strong)] bg-[var(--login-field)] text-transparent transition-colors peer-checked:border-[var(--accent)] peer-checked:bg-[var(--accent)] peer-checked:text-[var(--on-accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--accent)]">
            <Check size={14} strokeWidth={3} />
          </span>
          Se souvenir de moi
        </label>
        <button type="button" className="text-[var(--accent)] underline underline-offset-4 hover:opacity-80">Mot de passe oublié ?</button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className={`btn btn-primary relative !h-12 w-full text-base ${isSubmitting ? 'login-submit-loading' : ''}`}
      >
        <span className="relative z-10" aria-live="polite">{isSubmitting ? 'Connexion...' : 'Se connecter'}</span>
        {isSubmitting
          ? <LoaderCircle size={19} className="absolute right-5 z-10 animate-spin" aria-hidden="true" />
          : <ArrowRight size={19} className="absolute right-5" />}
      </button>

      <p className="flex items-center gap-4 pt-2 text-xs text-[var(--text-soft)]">
        <span className="h-px flex-1 bg-[var(--login-line)]" />
        <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[var(--accent)]" /> Authentification à deux facteurs (2FA) requise</span>
        <span className="h-px flex-1 bg-[var(--login-line)]" />
      </p>
    </form>
  );
};

export default LoginForm;
