import { useRef, useState } from 'react';
import { highlightLine } from '../../utils/markdown';

const LINE = 24; // hauteur de ligne (px) : identique pour le gutter, la coloration et le textarea

const KIND_CLASS = {
  heading: 'text-[var(--accent)]',
  fence: 'text-[var(--role-doc)]',
  code: 'text-[var(--text-soft)]',
  quote: 'text-[var(--text-muted)]',
  hr: 'text-[var(--text-muted)]',
  marker: 'text-[var(--accent)]',
  bold: 'text-[var(--text)]',
  italic: 'text-[var(--text)]',
  inlineCode: 'text-[var(--role-admin)]',
  link: 'text-[var(--cyan)]',
};

/**
 * Éditeur Markdown : un <textarea> transparent par-dessus une copie colorée du texte.
 * Seules les couleurs changent (jamais la graisse ni la largeur) pour garder les deux couches alignées.
 * Tab insère 2 espaces ; Échap puis Tab quitte le champ (accessibilité clavier).
 */
const MarkdownEditor = ({ value, onChange, textareaRef, onAction }) => {
  const mirrorRef = useRef(null);
  const gutterRef = useRef(null);
  const tabFree = useRef(false);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const lines = value.split('\n');
  let inFence = false;
  const rendered = lines.map((line) => {
    const result = highlightLine(line, inFence);
    inFence = result.inFence;
    return result.segments;
  });

  const syncScroll = (e) => {
    const { scrollTop, scrollLeft } = e.currentTarget;
    if (mirrorRef.current) mirrorRef.current.style.transform = `translate(${-scrollLeft}px, ${-scrollTop}px)`;
    if (gutterRef.current) gutterRef.current.style.transform = `translateY(${-scrollTop}px)`;
  };

  const updateCursor = (ta) => {
    const before = ta.value.slice(0, ta.selectionStart);
    const lastBreak = before.lastIndexOf('\n');
    setCursor({ line: before.split('\n').length, col: before.length - lastBreak });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { tabFree.current = true; return; }
    if (e.key === 'Tab' && !tabFree.current) {
      e.preventDefault();
      onAction(e.shiftKey ? 'outdent' : 'indent');
      return;
    }
    tabFree.current = false;
    if ((e.ctrlKey || e.metaKey) && !e.altKey && ['b', 'i'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      onAction(e.key.toLowerCase() === 'b' ? 'bold' : 'italic');
    }
  };

  const text = { fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)', fontSize: 13, lineHeight: `${LINE}px` };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1 overflow-hidden" style={text}>
        {/* Numéros de ligne */}
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-12 overflow-hidden border-r border-[var(--border)]">
          <div ref={gutterRef} className="py-3 pr-3 text-right text-[var(--text-muted)]">
            {lines.map((_, i) => (
              <div key={i} style={{ height: LINE }} className={i + 1 === cursor.line ? 'text-[var(--accent)]' : ''}>{i + 1}</div>
            ))}
          </div>
        </div>

        {/* Coloration syntaxique (copie du texte) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-12 right-0 overflow-hidden">
          <div ref={mirrorRef} className="w-max min-w-full whitespace-pre py-3">
            {rendered.map((segments, i) => (
              <div key={i} style={{ height: LINE }} className={`px-4 ${i + 1 === cursor.line ? 'bg-[var(--surface-2)]' : ''}`}>
                {segments.length === 0
                  ? ' '
                  : segments.map((s, j) => <span key={j} className={s.kind ? KIND_CLASS[s.kind] : 'text-[var(--text-soft)]'}>{s.text}</span>)}
              </div>
            ))}
          </div>
        </div>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => { onChange(e.target.value); updateCursor(e.target); }}
          onSelect={(e) => updateCursor(e.currentTarget)}
          onScroll={syncScroll}
          onKeyDown={onKeyDown}
          onBlur={() => { tabFree.current = false; }}
          spellCheck={false}
          wrap="off"
          aria-label="Contenu Markdown du guide"
          className="md-textarea absolute inset-y-0 left-12 right-0 resize-none overflow-auto whitespace-pre bg-transparent px-4 py-3 caret-[var(--accent)] outline-none"
          style={text}
        />
      </div>

      <div className="flex items-center justify-end gap-5 border-t border-[var(--border)] px-4 py-2 text-xs text-[var(--text-muted)]">
        <span>Ln {cursor.line}, Col {cursor.col}</span>
        <span>Espaces : 2</span>
        <span>Markdown</span>
      </div>
    </div>
  );
};

export default MarkdownEditor;
