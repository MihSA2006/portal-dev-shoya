import { Link } from 'react-router-dom';
import { ArrowUp, ArrowDown, ArrowUpRight } from 'lucide-react';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function StatCard({ icon: Icon, label, value, suffix = '', trend, to, index = 0 }) {
  const up = trend >= 0;
  const TrendIcon = up ? ArrowUp : ArrowDown;

  return (
    <Link
      to={to}
      aria-label={`${label} : ${value}${suffix}. Ouvrir la page associée`}
      className="group block h-full anim-pop [animation-fill-mode:backwards] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 motion-reduce:transform-none"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="cut-frame cut-sm h-full [--frame-bg:var(--surface)] group-hover:[--frame-border:var(--accent)] group-focus-visible:[--frame-border:var(--accent)]">
        <div className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
              <Icon size={20} />
            </span>
            <ArrowUpRight
              size={16}
              className="text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </div>

          <p className="text-sm font-medium leading-tight text-[var(--text-soft)]">{label}</p>

          <div className="mt-auto flex items-end justify-between gap-2">
            <p className="font-display text-4xl font-semibold leading-none text-[var(--text)]">
              <AnimatedNumber value={value} suffix={suffix} />
            </p>
            <div className="pb-0.5 text-right text-xs leading-tight">
              <p data-tone={up ? 'accent' : 'lead'} className="flex items-center justify-end gap-1 font-semibold text-[var(--tone)]">
                <TrendIcon size={13} /> {Math.abs(trend)} %
              </p>
              <p className="text-[var(--text-muted)]">vs cycle précédent</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}