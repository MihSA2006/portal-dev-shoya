import { useDeferredValue, useMemo, useRef } from 'react';
import DocProjectIcon from '../documentation/DocProjectIcon';
import GuideAside from './GuideAside';
import MarkdownView from './MarkdownView';
import { parseMarkdown } from '../../utils/markdown';

/** Rendu en temps réel du Markdown (useDeferredValue garde la frappe fluide sur les longs guides). */
const GuidePreview = ({ content, project, related }) => {
  const deferred = useDeferredValue(content);
  const { blocks, headings, callouts } = useMemo(() => parseMarkdown(deferred), [deferred]);
  const scrollRef = useRef(null);

  const goTo = (id) => {
    const el = scrollRef.current?.querySelector(`[id="guide-${id}"]`);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-5">
      {project && (
        <p data-tone="accent" className="mb-5 flex items-center gap-3 font-display text-lg font-semibold">
          <DocProjectIcon project={project} /> {project.name}
        </p>
      )}
      <div className="guide-preview">
        <div className="guide-preview-grid">
          <article className="min-w-0">
            {content.trim() ? (
              <MarkdownView blocks={blocks} />
            ) : (
              <p className="py-10 text-center text-sm text-[var(--text-muted)]">Commencez à écrire pour voir l'aperçu.</p>
            )}
          </article>
          <GuideAside callouts={callouts} related={related} headings={headings} onGoTo={goTo} />
        </div>
      </div>
    </div>
  );
};

export default GuidePreview;
