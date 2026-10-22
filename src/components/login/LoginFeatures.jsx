import { FileText, Heart, ShieldCheck, Users } from 'lucide-react';
import { LOGIN_FEATURES } from '../../constants/login';

const ICONS = { docs: FileText, team: Users, heart: Heart, shield: ShieldCheck };

const LoginFeatures = () => (
  <ul className="login-features space-y-6">
    {LOGIN_FEATURES.map(({ icon, title, text }, i) => {
      const Icon = ICONS[icon];
      return (
        <li key={title} className="login-feature-item animate-enter flex items-center gap-5" style={{ animationDelay: `${120 + i * 70}ms` }}>
          <Icon size={34} strokeWidth={1.4} className="shrink-0 text-[var(--accent)]" />
          <div>
            <p className="login-feature-title text-base font-semibold">{title}</p>
            <p className="login-feature-description text-sm">{text}</p>
          </div>
        </li>
      );
    })}
  </ul>
);

export default LoginFeatures;
