import { useCallback, useEffect, useRef, useState } from 'react';

/** Simule le test de connexion GitHub : idle -> loading -> ok | error. */
export default function useGithubTest(repo) {
  const [state, setState] = useState('idle');
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => setState('idle'), [repo]);

  const run = useCallback(() => {
    setState('loading');
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setState(/^[\w.-]+\/[\w.-]+$/.test(repo) ? 'ok' : 'error'),
      900
    );
  }, [repo]);

  return { state, run };
}
