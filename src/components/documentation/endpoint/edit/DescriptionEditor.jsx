import { useRef } from 'react';
import { FileText, Bold, Italic, Code2, List, Link2 } from 'lucide-react';
import EditCard from './EditCard';
import { inputCls } from './EditField';

const MAX = 1000;

const TOOLS = [
  { id: 'bold', label: 'Gras', icon: Bold },
  { id: 'italic', label: 'Italique', icon: Italic },
  { id: 'code', label: 'Code', icon: Code2 },
  { id: 'list', label: 'Liste', icon: List },
  { id: 'link', label: 'Lien', icon: Link2 },
];

function applyMarkdown(kind, value, start, end) {
  const sel = value.slice(start, end);

  const wrap = (mark) => {
    const inner = sel || 'texte';
    return {
      next: value.slice(0, start) + mark + inner + mark + value.slice(end),
      from: start + mark.length,
      to: start + mark.length + inner.length,
    };
  };

  switch (kind) {
    case 'bold': return wrap('**');
    case 'italic': return wrap('*');
    case 'code': return wrap('`');
    case 'link': {
      const inner = sel || 'texte';
      const from = start + inner.length + 3;
      return { next: `${value.slice(0, start)}[${inner}](https://)${value.slice(end)}`, from, to: from + 8 };
    }
    case 'list': {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const listed = value
        .slice(lineStart, end)
        .split('\n')
        .map((l) => (l.startsWith('- ') ? l : `- ${l}`))
        .join('\n');
      return { next: value.slice(0, lineStart) + listed + value.slice(end), from: lineStart, to: lineStart + listed.length };
    }
    default: return { next: value, from: start, to: end };
  }
}

export default function DescriptionEditor({ value, onChange }) {
  const ref = useRef(null);

  const run = (kind) => {
    const ta = ref.current;
    if (!ta) return;
    const { next, from, to } = applyMarkdown(kind, value, ta.selectionStart, ta.selectionEnd);
    if (next.length > MAX) return;
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(from, to);
    });
  };

  return (
    <EditCard title="Description" icon={FileText}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex gap-1" role="toolbar" aria-label="Mise en forme">
          {TOOLS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => run(id)}
              aria-label={label}
              title={label}
              className="grid h-8 w-8 place-items-center border border-[var(--border)] text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Icon size={15} />
            </button>
          ))}
        </div>
        <span className="text-xs text-[var(--text-muted)]">Markdown · {value.length}/{MAX}</span>
      </div>

      <textarea
        ref={ref}
        value={value}
        maxLength={MAX}
        rows={7}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Description de l'endpoint"
        placeholder={'# Titre\n\nDécrivez ce que fait cet endpoint…'}
        className={`${inputCls(false, '')} resize-y py-3 font-mono text-[13px] leading-6`}
      />
    </EditCard>
  );
}
