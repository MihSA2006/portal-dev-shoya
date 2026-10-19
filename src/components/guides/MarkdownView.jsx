import { Check } from 'lucide-react';
import { safeImageUrl, safeUrl } from '../../utils/markdown';
import GuideCodeBlock from './GuideCodeBlock';

const renderInline = (nodes, prefix = '') =>
  nodes.map((n, i) => {
    const key = `${prefix}${i}`;
    switch (n.type) {
      case 'bold':
        return <strong key={key} className="font-semibold text-[var(--text)]">{renderInline(n.children, `${key}-`)}</strong>;
      case 'italic':
        return <em key={key}>{renderInline(n.children, `${key}-`)}</em>;
      case 'code':
        return <code key={key} className="bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--accent)]">{n.text}</code>;
      case 'link': {
        const href = safeUrl(n.url);
        const inner = renderInline(n.children, `${key}-`);
        if (!href) return <span key={key}>{inner}</span>;
        const external = /^(https?:|mailto:)/i.test(href);
        return (
          <a key={key} href={href} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})} className="text-[var(--accent)] underline-offset-2 hover:underline">
            {inner}
          </a>
        );
      }
      case 'image': {
        const src = safeImageUrl(n.url);
        return src ? <img key={key} src={src} alt={n.alt} loading="lazy" className="my-2 max-w-full border border-[var(--border)]" /> : <span key={key}>{n.alt}</span>;
      }
      default:
        return n.text;
    }
  });

const HEADING = {
  1: 'font-display text-3xl font-semibold',
  2: 'font-display text-xl font-semibold text-[var(--accent)] pt-2',
  3: 'font-display text-lg font-semibold',
  4: 'text-base font-semibold',
  5: 'text-sm font-semibold',
  6: 'text-sm font-semibold text-[var(--text-soft)]',
};

const Block = ({ block }) => {
  switch (block.type) {
    case 'heading': {
      const Tag = `h${block.level}`;
      return <Tag id={`guide-${block.id}`} className={`scroll-mt-4 ${HEADING[block.level]}`}>{renderInline(block.children)}</Tag>;
    }
    case 'paragraph':
      return <p className="text-sm leading-6 text-[var(--text-soft)]">{renderInline(block.children)}</p>;
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`space-y-2 text-sm text-[var(--text-soft)] ${block.ordered ? 'list-decimal pl-5' : block.items.some((it) => it.checked !== null) ? '' : 'list-disc pl-5'}`}>
          {block.items.map((item, i) => (
            <li key={i} className={item.checked !== null ? 'flex items-start gap-3' : ''}>
              {item.checked !== null && (
                <span
                  role="img"
                  aria-label={item.checked ? 'Fait' : 'À faire'}
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center ${item.checked ? 'bg-[var(--accent)] text-[var(--on-accent)]' : 'border border-[var(--border-strong)]'}`}
                >
                  {item.checked && <Check size={14} strokeWidth={3} />}
                </span>
              )}
              <span>{renderInline(item.children)}</span>
            </li>
          ))}
        </Tag>
      );
    }
    case 'code':
      return <GuideCodeBlock lang={block.lang} code={block.code} />;
    case 'quote':
      return <blockquote className="border-l-2 border-[var(--accent)] pl-4 text-sm italic text-[var(--text-soft)]">{renderInline(block.children)}</blockquote>;
    case 'table':
      return (
        <div className="overflow-x-auto border border-[var(--border)]">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="bg-[var(--surface-2)] text-xs text-[var(--text-soft)]">
                {block.head.map((cell, i) => <th key={i} className="px-4 py-2.5 font-medium">{renderInline(cell)}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-[var(--border)]">
                  {row.map((cell, c) => <td key={c} className="px-4 py-2.5 text-[var(--text-soft)]">{renderInline(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'hr':
      return <hr className="border-[var(--border)]" />;
    default:
      return null;
  }
};

const MarkdownView = ({ blocks }) => (
  <div className="space-y-4">
    {blocks.map((block, i) => <Block key={i} block={block} />)}
  </div>
);

export { renderInline };
export default MarkdownView;
