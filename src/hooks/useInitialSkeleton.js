import { useEffect, useState } from 'react';

const useInitialSkeleton = (duration = 480) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  return loading;
};

export default useInitialSkeleton;
