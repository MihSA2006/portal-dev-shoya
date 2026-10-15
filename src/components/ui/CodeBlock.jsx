import { tokenize } from '../../utils/highlight';
import CopyButton from './CopyButton';

const KIND_CLASS = {
  comment: 'text-[var(--cyan)]',
  string: 'text-[var(--role-admin)]',
  number: 'text-[color-mix(in_srgb,var(--role-admin)_55%,var(--danger))]',
  keyword: 'text-[var(--role-doc)]',
  fn: 'text-[var(--cyan)]',
  variable: 'text-[var(--text)]',
};

/** Bloc de code coloré avec bouton "Copier". */
const CodeBlock = ({ code, className = '' }) => (
  <div className={`relative border border-[var(--border)] bg-[var(--bg-elevated)] ${className}`}>
    <div className="absolute right-2 top-2"><CopyButton value={code} label="Copier le code" /></div>
    <pre className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-6 text-[var(--text-soft)]">
      {code.split(/\r?\n/).map((line, i) => (
        <div key={i} className="min-h-[1.5rem] whitespace-pre">
          {tokenize(line).map((t, j) => (t.kind ? <span key={j} className={KIND_CLASS[t.kind]}>{t.text}</span> : t.text))}
        </div>
      ))}
    </pre>
  </div>
);

export default CodeBlock;
