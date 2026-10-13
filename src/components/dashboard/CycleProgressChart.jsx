import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import DashCard from './DashCard';
import useMounted from '../../hooks/useMounted';

const TICKS = [100, 75, 50, 25, 0];

const SERIES = [
  { key: 'expected', label: 'Progression attendue', color: 'var(--accent)',
    background: 'linear-gradient(to top, var(--accent-strong), var(--accent))' },
  { key: 'actual', label: 'Progression réelle', color: 'var(--role-lead)',
    background: 'linear-gradient(to top, color-mix(in srgb, var(--role-lead) 65%, #000), var(--role-lead))' },
];

const fmtGap = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n)} pts`;

function Bar({ value, show, mounted, delay, background, dim }) {
  if (value == null) return null;
  const visible = show && mounted;
  return (
    <div
      className="relative w-6 transition-[height,opacity] duration-700 ease-out motion-reduce:transition-none sm:w-8"
      style={{ height: visible ? `${value}%` : 0, background, opacity: dim ? 0.5 : 1, transitionDelay: `${delay}ms` }}
    >
      <span
        className={`absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-[var(--text)] transition-opacity duration-500 motion-reduce:transition-none sm:text-xs ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: `${delay + 300}ms` }}
      >
        {value}%
      </span>
    </div>
  );
}

/**
 * weeks       : [{ expected, actual|null }]
 * currentWeek : semaine en cours (1-based)
 * Interactions : légende cliquable (masquer/afficher une série), survol/clic d'une semaine.
 */
export default function CycleProgressChart({ weeks, currentWeek, scope }) {
  const mounted = useMounted();
  const [hidden, setHidden] = useState({ expected: false, actual: false });
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hover ?? pinned;

  // On ne peut pas masquer les deux séries en même temps
  const toggle = (key) =>
    setHidden((h) => {
      const next = { ...h, [key]: !h[key] };
      return next.expected && next.actual ? h : next;
    });

  const week = active != null ? weeks[active] : null;
  const gap = week && week.actual != null ? week.actual - week.expected : null;

  return (
    <DashCard title="Progression du cycle par semaine" icon={TrendingUp} scope={scope}>
      {/* Bandeau de détail + légende cliquable */}
      <div className="mb-1 flex min-h-[1.75rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs">
        <p aria-live="polite" className="text-[var(--text-muted)]">
          {week ? (
            <span className="text-[var(--text-soft)]">
              <span className="font-semibold text-[var(--text)]">Semaine {active + 1}</span>
              {' · '}Attendu {week.expected} %
              {week.actual != null ? (
                <>
                  {' · '}Réel {week.actual} %{' '}
                  <span data-tone={gap < 0 ? 'admin' : 'accent'} className="font-semibold text-[var(--tone)]">
                    ({fmtGap(gap)})
                  </span>
                </>
              ) : (
                ' · Réel : à venir'
              )}
            </span>
          ) : (
            'Survolez ou cliquez une semaine pour voir le détail.'
          )}
        </p>

        <div className="flex items-center gap-4">
          {SERIES.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={!hidden[s.key]}
              onClick={() => toggle(s.key)}
              className={`flex items-center gap-2 transition-opacity hover:opacity-100 ${
                hidden[s.key] ? 'text-[var(--text-muted)] line-through opacity-50' : 'text-[var(--text-soft)]'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {/* Axe Y */}
        <div className="relative mt-6 h-60 w-10 shrink-0" aria-hidden="true">
          {TICKS.map((t) => (
            <span key={t} className="absolute right-0 translate-y-1/2 text-xs text-[var(--text-muted)]" style={{ bottom: `${t}%` }}>
              {t}%
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="relative mt-6 h-60" role="group" aria-label="Progression du cycle par semaine">
            {TICKS.map((t) => (
              <div key={t} className="absolute inset-x-0 border-t border-[var(--border)]" style={{ bottom: `${t}%` }} />
            ))}

            <div className="absolute inset-0 flex">
              {weeks.map((w, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={pinned === i}
                  aria-label={`Semaine ${i + 1} : attendu ${w.expected} %${w.actual != null ? `, réel ${w.actual} %` : ', réel à venir'}`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  onClick={() => setPinned((p) => (p === i ? null : i))}
                  className={`flex h-full flex-1 items-end justify-center gap-1.5 outline-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                    active === i ? 'bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]' : ''
                  } ${pinned === i ? 'shadow-[inset_0_-2px_0_var(--accent)]' : ''}`}
                >
                  <Bar value={w.expected} show={!hidden.expected} mounted={mounted} delay={i * 70}
                       background={SERIES[0].background} dim={active != null && active !== i} />
                  <Bar value={w.actual} show={!hidden.actual} mounted={mounted} delay={i * 70 + 60}
                       background={SERIES[1].background} dim={active != null && active !== i} />
                </button>
              ))}
            </div>
          </div>

          {/* Axe X */}
          <div className="mt-3 flex">
            {weeks.map((_, i) => (
              <span
                key={i}
                className={`flex-1 text-center text-xs ${
                  i + 1 === currentWeek ? 'font-semibold text-[var(--accent)]' : 'text-[var(--text-muted)]'
                }`}
              >
                <span className="sm:hidden">S{i + 1}</span>
                <span className="hidden sm:inline">Semaine {i + 1}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashCard>
  );
}