import { useId } from 'react';

/** Emblème « S » dans un hexagone (à remplacer par votre logo officiel si besoin). */
const LoginMark = ({ size = 44 }) => {
  const id = useId();
  return (
    <svg width={size} height={Math.round(size * 1.12)} viewBox="0 0 48 54" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="8" y1="6" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-strong)' }} />
        </linearGradient>
      </defs>
      <polygon points="24,2 44,13.5 44,40.5 24,52 4,40.5 4,13.5" strokeWidth="2" strokeLinejoin="round" style={{ stroke: `url(#${id})`, fill: 'var(--accent-tint)' }} />
      <path d="M33 17c0-4.5-6-6.5-11-5.5-5 1-7 5-3.5 8.2 3.6 3.2 11.4 3.2 13.6 8.3 2.4 5.4-3 9.5-10.6 9-3.6-.2-6.5-1.4-8.2-3.2" strokeWidth="4.5" strokeLinecap="round" style={{ stroke: `url(#${id})` }} />
    </svg>
  );
};

export default LoginMark;
