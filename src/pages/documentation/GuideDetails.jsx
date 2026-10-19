import { BookOpen, Pencil } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGuides } from '../../context/guidesContext';
import { parseMarkdown } from '../../utils/markdown';
import MarkdownView from '../../components/guides/MarkdownView';
import StatusPill from '../../components/endpoints/StatusPill';

const GuideDetails = ({ project }) => {
  const { guideId } = useParams();
  const { guides } = useGuides();
  const guide = guides.find((item) => item.id === guideId && item.projectId === project.id);

  if (!guide) {
    return (
      <div className="cut-frame p-8 text-center [--frame-bg:var(--surface)]">
        <BookOpen size={24} className="mx-auto text-[var(--text-muted)]" />
        <h1 className="mt-3 font-display text-xl font-semibold">Guide introuvable</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Ce guide n'existe pas ou n'est pas associé à ce projet.</p>
      </div>
    );
  }

  const { blocks } = parseMarkdown(guide.content);

  return (
    <article className="cut-frame [--frame-bg:var(--surface)]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] p-5">
        <div className="flex min-w-0 items-center gap-3">
          <BookOpen size={20} className="shrink-0 text-[var(--accent)]" />
          <h1 className="truncate font-display text-xl font-semibold">{guide.title}</h1>
          <StatusPill tone={guide.status === 'published' ? 'accent' : 'admin'} label={guide.status === 'published' ? 'Publié' : 'Brouillon'} />
        </div>
        <Link to={`/guides/${guide.id}`} className="btn btn-outline">
          <Pencil size={16} /> Modifier
        </Link>
      </header>
      <div className="guide-preview p-5">
        <MarkdownView blocks={blocks} />
      </div>
    </article>
  );
};

export default GuideDetails;
