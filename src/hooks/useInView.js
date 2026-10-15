import { useEffect, useState } from 'react';

/** true tant que l'élément est visible sous la navbar (sticky 4 rem). */
export default function useInView(ref) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px',
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}
