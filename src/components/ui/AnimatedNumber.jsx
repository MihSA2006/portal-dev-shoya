import { useEffect, useRef, useState } from 'react';

/** Compteur animé : part de la valeur affichée et glisse vers la nouvelle valeur. */
export default function AnimatedNumber({ value, suffix = '', duration = 900 }) {
  const [display, setDisplay] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      current.current = value;
      setDisplay(value);
      return undefined;
    }

    const startValue = current.current;
    const startTime = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(startValue + (value - startValue) * eased);
      current.current = next;
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{display}{suffix}</>;
}