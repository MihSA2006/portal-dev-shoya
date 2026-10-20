import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import DashCard from './DashCard';
import useMounted from '../../hooks/useMounted';

const R = 46;
const C = 2 * Math.PI * R;

/**
 * health     : { completed, inProgress, notStarted }
 * projects   : tous les projets (barres « Par projet », cliquables)
 * selectedId : projet filtré ('' = tous)
 * onSelect   : (id | '') => void
 */
export default function DocumentationHealthCard({ health, projects, selectedId, onSelect, scope }) {
  const mounted = useMounted();
  const [hover, setHover] = useState(null);
  const [pinned, setPinned] = useState(null);
  const active = hover ?? pinned;

  const segments = [
    { label: 'Terminé',      value: health.completed,  color: 'var(--accent)' },
    { label: 'En cours',     value: health.inProgress, color: 'var(--role-lead)' },
    { label: 'Non commencé', value: health.notStarted, color: 'var(--role-doc)' },
  ];

  // Arcs du donut
  let offset = 0;
  const arcs = segments.map((s) => {
    const len = (s.value / 100) * C;
    const arc = { ...s, dash: Math.max(len - 2, 0), offset };
    offset += len;
    return arc;
  });

  const shown = active != null ? segments[active] : { label: 'Terminé', value: health.completed };

  const hoverProps = (i) => ({
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(i),
    onBlur: () => setHover(null),
    onClick: () => setPinned((p) => (p === i ? null : i)),
  });

  return (
    <DashCard title="Santé de la documentation" icon={BookOpen} scope={scope}>
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full" role="img" aria-label={`${health.completed} % de la documentation terminée`}>
            <circle cx="60" cy="60" r={R} fill="none" strokeWidth="9" style={{ stroke: 'var(--surface-2)' }} />
            {arcs.map((a, i) => (
              <circle
                key={a.label}
                cx="60" cy="60" r={R}
                fill="none"
                transform="rotate(-90 60 60)"
                className="cursor-pointer [transition:stroke-dasharray_0.9s_ease,stroke-dashoffset_0.9s_ease,stroke-width_0.2s,opacity_0.2s] motion-reduce:[transition:none]"
                style={{
                  stroke: a.color,
                  strokeWidth: active === i ? 12 : 9,
                  strokeDasharray: `${mounted ? a.dash : 0} ${C}`,
                  strokeDashoffset: -a.offset,
                  opacity: active != null && active !== i ? 0.35 : 1,
                  transitionDelay: mounted ? `${i * 120}ms, ${i * 120}ms, 0ms, 0ms` : '0ms',
                }}
                {...hoverProps(i)}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-center">
            <p className="font-display text-2xl font-semibold leading-none text-[var(--text)]">{shown.value} %</p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">{shown.label}</p>
          </div>
        </div>

        <ul className="min-w-[10rem] flex-1 space-y-1 border border-[var(--border)] bg-[var(--bg-elevated)] p-2 text-sm">
          {segments.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                aria-pressed={pinned === i}
                className={`flex w-full items-center gap-2.5 px-1.5 py-1.5 text-left transition-colors hover:bg-[var(--surface-2)] ${
                  active === i ? 'bg-[var(--surface-2)] text-[var(--text)]' : 'text-[var(--text-soft)]'
                }`}
                {...hoverProps(i)}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                <span className="flex-1">{s.label}</span>
                <span>{s.value} %</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-medium text-[var(--text-soft)]">Par projet</p>
        <ul className="space-y-1">
          {projects.map((p, i) => {
            const selected = p.id === selectedId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onSelect(selected ? '' : p.id)}
                  className={`block w-full px-2 py-1.5 text-left transition-colors hover:bg-[var(--surface-2)] ${
                    selected ? 'bg-[var(--accent-tint)]' : ''
                  }`}
                >
                  <span className={`mb-1.5 flex items-center justify-between text-sm ${selected ? 'text-[var(--accent)]' : 'text-[var(--text-soft)]'}`}>
                    <span>{p.name}</span>
                    <span>{p.docHealth.completed} %</span>
                  </span>
                  <span className="block h-1.5 bg-[var(--surface-2)]">
                    <span
                      className="block h-full transition-[width] duration-700 ease-out motion-reduce:transition-none"
                      style={{
                        width: mounted ? `${p.docHealth.completed}%` : 0,
                        transitionDelay: `${i * 100}ms`,
                        background: 'linear-gradient(to right, color-mix(in srgb, var(--role-lead) 65%, var(--shadow)), var(--role-lead))',
                      }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </DashCard>
  );
}