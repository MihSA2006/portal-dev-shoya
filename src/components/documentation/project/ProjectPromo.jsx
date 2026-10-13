/** Pied du sidebar : illustration décorative + nom et description du projet. */
const ProjectPromo = ({ project }) => (
  <div className="border-t border-[var(--border)] p-4">
    <svg viewBox="0 0 160 100" className="mx-auto mb-3 h-20 w-auto" aria-hidden="true">
      {[2, 1, 0].map((i) => (
        <g key={i} transform={`translate(0 ${i * 16})`} opacity={1 - i * 0.25}>
          <path d="M80 12 L132 34 L80 56 L28 34 Z" style={{ fill: 'var(--accent-tint)', stroke: 'var(--accent)' }} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M28 34 V42 L80 64 L132 42 V34" style={{ fill: 'none', stroke: 'var(--accent)' }} strokeWidth="1.5" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
    <p className="font-display text-sm font-semibold text-[var(--accent)]">{project.name}</p>
    {project.tagline && <p className="mt-1 text-xs leading-5 text-[var(--text-soft)]">{project.tagline}</p>}
  </div>
);

export default ProjectPromo;
