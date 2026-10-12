import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import ProjectIcon from './ProjectIcon.jsx';

const ProjectHeader = ({ project, valid }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex min-w-0 items-center gap-4">
      <ProjectIcon project={project} size="lg" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="truncate font-display text-2xl font-semibold">{project.name || 'Sans nom'}</h2>
          <span data-tone="accent" className="tone-badge px-2 py-0.5 text-xs font-medium">Actif</span>
        </div>
        <p className="mt-1 truncate text-sm text-[var(--text-muted)]">{project.tagline || 'Aucune description courte'}</p>
      </div>
    </div>

    <div
      role="status"
      data-tone={valid ? 'accent' : 'admin'}
      className="tone-badge flex h-12 items-center gap-2.5 px-4 text-sm font-medium"
    >
      {valid ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
      {valid ? 'Configuration valide' : 'Configuration incomplète'}
    </div>
  </div>
);

export default ProjectHeader;
