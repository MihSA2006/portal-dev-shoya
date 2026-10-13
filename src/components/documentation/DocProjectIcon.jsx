import { Box, Wallet } from 'lucide-react';

const ICONS = { wallet: Wallet, code: Box };
const SIZES = { sm: 'h-7 w-7 text-xs', lg: 'h-14 w-14 text-2xl' };

/** Tuile d'icône colorée par --tone (à définir via data-tone sur un parent). */
const DocProjectIcon = ({ project, size = 'sm' }) => {
  const Icon = ICONS[project.icon];
  return (
    <span className={`grid shrink-0 place-items-center border border-[var(--tone)] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] font-display font-bold text-[var(--tone)] ${SIZES[size]}`}>
      {Icon ? <Icon size={size === 'lg' ? 28 : 15} /> : project.name.charAt(0).toUpperCase()}
    </span>
  );
};

export default DocProjectIcon;
