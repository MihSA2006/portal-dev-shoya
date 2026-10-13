import { useEffect, useState } from 'react';

/** Passe à true après le premier rendu peint : sert à déclencher les animations d'entrée (barres, arcs…). */
export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return mounted;
}