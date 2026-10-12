import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const CopyButton = ({ value, label = 'Copier' }) => {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch { /* presse-papiers indisponible */ }
  };

  return (
    <button type="button" onClick={copy} className="icon-btn !h-8 !w-8" aria-label={label} title={done ? 'Copié' : label}>
      {done ? <Check size={16} className="text-[var(--accent)]" /> : <Copy size={16} />}
    </button>
  );
};

export default CopyButton;
