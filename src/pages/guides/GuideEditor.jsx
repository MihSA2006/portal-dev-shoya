import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, FileCode2, Maximize2, Minimize2 } from 'lucide-react';
import { useGuides } from '../../context/guidesContext';
import { useProjects } from '../../context/ProjectsContext';
import useMarkdownActions from '../../hooks/useMarkdownActions';
import EditorFooter from '../../components/guides/EditorFooter';
import EditorPanel from '../../components/guides/EditorPanel';
import GuidePreview from '../../components/guides/GuidePreview';
import MarkdownEditor from '../../components/guides/MarkdownEditor';
import MarkdownToolbar from '../../components/guides/MarkdownToolbar';
import StatusPill from '../../components/endpoints/StatusPill';

/** Éditeur Markdown (gauche) + aperçu en temps réel (droite). Remonté par guide grâce à key. */
const EditorForm = ({ guide, project, related, onSave }) => {
  const [title, setTitle] = useState(guide.title);
  const [content, setContent] = useState(guide.content);
  const [mode, setMode] = useState('split'); // split | editor | preview
  const [notice, setNotice] = useState('');
  const textareaRef = useRef(null);
  const run = useMarkdownActions(textareaRef);

  const dirty = title !== guide.title || content !== guide.content;

  // Avertit avant de fermer l'onglet avec des modifications non enregistrées.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = (status) => {
    const finalTitle = title.trim() || guide.title;
    setTitle(finalTitle);
    onSave(guide.id, { title: finalTitle, content, status });
    setNotice(status === 'published' ? 'Guide publié.' : 'Brouillon enregistré.');
  };

  const edit = (setter) => (value) => { setter(value); setNotice(''); };

  const showEditor = mode !== 'preview';
  const showPreview = mode !== 'editor';

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link to="/guides" className="inline-flex items-center gap-2 text-sm text-[var(--text-soft)] hover:text-[var(--accent)]">
          <ArrowLeft size={16} /> Guides
        </Link>
        <input
          value={title}
          onChange={(e) => edit(setTitle)(e.target.value)}
          aria-label="Titre du guide"
          maxLength={80}
          className="min-w-[12rem] flex-1 border-b border-transparent bg-transparent font-display text-2xl font-semibold outline-none focus:border-[var(--accent)]"
        />
        <span className="text-sm text-[var(--text-muted)]">Projet : {project?.name ?? 'supprimé'}</span>
        <StatusPill tone={guide.status === 'published' ? 'accent' : 'admin'} label={guide.status === 'published' ? 'Publié' : 'Brouillon'} />
      </header>

      <MarkdownToolbar
        onAction={run}
        disabled={!showEditor}
        previewVisible={showPreview}
        onTogglePreview={() => setMode(mode === 'split' ? 'editor' : 'split')}
      />

      <div className={`grid gap-4 lg:h-[calc(100dvh-19rem)] lg:min-h-[26rem] ${mode === 'split' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
        <EditorPanel icon={FileCode2} title="Markdown" className={`h-[28rem] lg:h-full ${showEditor ? '' : 'hidden'}`}>
          <MarkdownEditor value={content} onChange={edit(setContent)} textareaRef={textareaRef} onAction={run} />
        </EditorPanel>

        {showPreview && (
          <EditorPanel
            icon={Eye}
            title="Aperçu"
            className="h-[28rem] lg:h-full"
            actions={
              <button
                type="button"
                onClick={() => setMode(mode === 'preview' ? 'split' : 'preview')}
                className="icon-btn !h-8 !w-8"
                aria-label={mode === 'preview' ? "Réduire l'aperçu" : "Agrandir l'aperçu"}
                title={mode === 'preview' ? "Réduire l'aperçu" : "Agrandir l'aperçu"}
              >
                {mode === 'preview' ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            }
          >
            <GuidePreview content={content} project={project} related={related} />
          </EditorPanel>
        )}
      </div>

      <EditorFooter
        dirty={dirty}
        status={guide.status}
        updatedAt={guide.updatedAt}
        notice={dirty ? '' : notice}
        onSaveDraft={() => save('draft')}
        onPublish={() => save('published')}
      />
    </div>
  );
};

const GuideEditor = () => {
  const { guideId } = useParams();
  const { guides, saveGuide } = useGuides();
  const { projects } = useProjects();
  const guide = guides.find((g) => g.id === guideId);

  if (!guide) {
    return (
      <div className="space-y-3">
        <h1 className="font-display text-3xl font-semibold">Guide introuvable</h1>
        <Link to="/guides" className="text-sm text-[var(--accent)] underline">Retour aux guides</Link>
      </div>
    );
  }

  const project = projects.find((p) => p.id === guide.projectId);
  const related = guides.filter((g) => g.projectId === guide.projectId && g.id !== guide.id);

  return <EditorForm key={guide.id} guide={guide} project={project} related={related} onSave={saveGuide} />;
};

export default GuideEditor;
