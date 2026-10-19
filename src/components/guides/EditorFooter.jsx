import { CloudUpload, Save } from 'lucide-react';

const formatDate = (ms) => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms));

/** Barre d'actions : état d'enregistrement + Enregistrer le brouillon / Publier. */
const EditorFooter = ({ dirty, status, updatedAt, notice, onSaveDraft, onPublish }) => (
  <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
    <p role="status" data-tone={dirty ? 'admin' : 'accent'} className="flex items-center gap-2 text-sm text-[var(--text-soft)]">
      <span className="h-2 w-2 rounded-full bg-[var(--tone)]" />
      {notice ||
        (dirty
          ? 'Modifications non enregistrées'
          : `${status === 'published' ? 'Publié' : 'Brouillon enregistré'} · ${formatDate(updatedAt)}`)}
    </p>
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={onSaveDraft} className="btn btn-outline"><Save size={17} /> Enregistrer le brouillon</button>
      <button type="button" onClick={onPublish} className="btn btn-primary"><CloudUpload size={17} /> Publier</button>
    </div>
  </footer>
);

export default EditorFooter;
