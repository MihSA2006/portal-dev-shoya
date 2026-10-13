import { currentVersion } from '../../../utils/documentation';
import DocProjectIcon from '../DocProjectIcon';

/** En-tête du sidebar : icône, nom, description courte et version courante. */
const ProjectBrand = ({ project }) => (
  <div data-tone="accent" className="flex items-center gap-3 border-b border-[var(--border)] p-4">
    <DocProjectIcon project={project} size="lg" />
    <div className="min-w-0 flex-1">
      <p className="truncate font-display text-lg font-semibold leading-tight">{project.name}</p>
      <p className="mt-0.5 line-clamp-2 text-xs text-[var(--text-muted)]">{project.tagline || 'Documentation API'}</p>
    </div>
    <span className="shrink-0 self-start border border-[var(--border-strong)] bg-[var(--accent-tint)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
      {currentVersion(project)}
    </span>
  </div>
);

export default ProjectBrand;
