/** Formate une ancienneté en minutes ("Il y a 5 min", "Il y a 2 h"...). */
export const formatAgo = (minutes) => {
  if (minutes == null) return 'Jamais';
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (minutes < 1440) return `Il y a ${Math.floor(minutes / 60)} h`;
  return `Il y a ${Math.floor(minutes / 1440)} j`;
};
