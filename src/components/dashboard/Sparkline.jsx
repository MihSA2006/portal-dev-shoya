import { useId } from 'react';
import useMounted from '../../hooks/useMounted';

/** Courbe avec révélation de gauche à droite à l'affichage. Changer la `key` rejoue l'animation. */
export default function Sparkline({ data, className = 'h-16 w-full' }) {
  const id = useId().replace(/:/g, '');
  const mounted = useMounted();

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => [(i / (data.length - 1)) * 100, 27 - ((v - min) / range) * 22]);
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const area = `${line} L100 30 L0 30 Z`;

  return (
    <div
      className={`${className} [transition:clip-path_1.1s_ease-out] motion-reduce:[transition:none]`}
      style={{ clipPath: `inset(0 ${mounted ? 0 : 100}% 0 0)` }}
    >
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--accent)', stopOpacity: 0.35 }} />
            <stop offset="1" style={{ stopColor: 'var(--accent)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${id})`} />
        <path d={line} fill="none" strokeWidth="1.2" vectorEffect="non-scaling-stroke" style={{ stroke: 'var(--accent)' }} />
      </svg>
    </div>
  );
}