import { Code2, Wallet } from 'lucide-react';

const ICONS = { wallet: Wallet, code: Code2 };

/** Tuile d'icône du projet ; sans icône dédiée, affiche l'initiale. */
const ProjectIcon = ({ project, size = 'md' }) => {
  const Icon = ICONS[project.icon];
  const box = size === 'lg' ? 'h-16 w-16 text-3xl' : 'h-11 w-11 text-xl';
  return (
    <span className={`grid shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] font-display font-bold text-[var(--accent)] ${box}`}>
      {Icon ? <Icon size={size === 'lg' ? 28 : 20} /> : project.name.charAt(0).toUpperCase()}
    </span>
  );
};

export default ProjectIcon;
