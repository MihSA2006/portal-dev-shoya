import { useId } from 'react';
import { formatCompact } from '../../../utils/overview';

/** Courbe en aires. Les libellés sont en HTML ; le SVG est étiré (traits non déformés). */
const RequestChart = ({ values, ticks, labels }) => {
  const id = useId();
  const top = ticks.at(-1);
  const pts = values.map((v, i) => [(i / (values.length - 1)) * 100, 100 - (v / top) * 100]);
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');

  return (
    <div className="flex gap-2">
      <div className="flex h-36 flex-col-reverse justify-between text-right text-[11px] text-[var(--text-muted)]" aria-hidden="true">
        {ticks.map((t) => <span key={t} className="leading-none">{formatCompact(t)}</span>)}
      </div>
      <div className="min-w-0 flex-1">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-36 w-full" role="img" aria-label="Évolution du nombre de requêtes">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.35 }} />
              <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          {[0, 33.33, 66.66, 100].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--border)' }} />
          ))}
          <path d={`${line} L100 100 L0 100 Z`} fill={`url(#${id})`} />
          <path d={line} fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--accent)' }} />
        </svg>
        <div className="mt-1.5 flex justify-between text-[11px] text-[var(--text-muted)]">
          {labels.map((l) => <span key={l}>{l}</span>)}
        </div>
      </div>
    </div>
  );
};

export default RequestChart;
