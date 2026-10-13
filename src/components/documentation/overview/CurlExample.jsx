import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const KIND = {
  cmd: 'text-[var(--cyan)]',
  url: 'text-[var(--cyan)]',
  str: 'text-[var(--role-admin)]',
  plain: 'text-[var(--text-soft)]',
};

/** Exemple cURL numéroté avec bouton "Copier". `curl` = { lines, text } (voir buildCurl). */
const CurlExample = ({ curl }) => {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(curl.text);
      setDone(true);
      setTimeout(() => setDone(false), 1400);
    } catch { /* presse-papiers indisponible */ }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text)]">Exemple cURL</h3>
        <button type="button" onClick={copy} className="btn btn-outline !h-9 !px-3">
          {done ? <Check size={15} /> : <Copy size={15} />} {done ? 'Copié' : 'Copier'}
        </button>
      </div>
      <pre className="overflow-x-auto border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono text-[13px] leading-6">
        {curl.lines.map((line, i) => (
          <div key={i} className="flex gap-4 whitespace-pre">
            <span className="w-3 shrink-0 select-none text-right text-[var(--text-muted)]">{i + 1}</span>
            <code>{line.map(([text, kind], j) => <span key={j} className={KIND[kind]}>{text}</span>)}</code>
          </div>
        ))}
      </pre>
    </div>
  );
};

export default CurlExample;
