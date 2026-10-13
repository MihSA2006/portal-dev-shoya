/** Anneau de progression (0-100) avec libellé central. */
const DonutChart = ({ percent, label, size = 150, stroke = 12 }) => {
  const r = (size - stroke) / 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" role="img" aria-label={`${percent}% ${label}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} style={{ stroke: 'var(--surface-2)' }} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} pathLength="100"
          strokeDasharray={`${percent} ${100 - percent}`}
          style={{ stroke: 'var(--accent)', filter: 'drop-shadow(0 0 6px var(--accent-glow))' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <p className="font-display text-2xl font-semibold">{percent}%</p>
        <p className="text-xs text-[var(--text-soft)]">{label}</p>
      </div>
    </div>
  );
};

export default DonutChart;
