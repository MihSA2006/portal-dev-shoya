import { useState } from 'react';
import { FolderKanban } from 'lucide-react';
import Dropdown from '../ui/Dropdown';
import { Field } from '../ui/Field';

/** Choix du projet + titre, puis création du guide (la redirection vers l'éditeur est faite par la page). */
const NewGuideForm = ({ projects, guides, onCreate }) => {
  const [projectId, setProjectId] = useState(String(projects[0]?.id ?? ''));
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const project = projects.find((p) => String(p.id) === projectId);
    const clean = title.trim();
    if (!project) return setError('Choisissez un projet.');
    if (clean.length < 3) return setError('Le titre doit contenir au moins 3 caractères.');
    if (guides.some((g) => g.projectId === project.id && g.title.toLowerCase() === clean.toLowerCase())) {
      return setError('Ce projet possède déjà un guide portant ce titre.');
    }
    onCreate({ projectId: project.id, title: clean });
  };

  return (
    <form onSubmit={submit} className="space-y-5 p-5" aria-labelledby="new-guide-title">
      <div>
        <h2 id="new-guide-title" className="font-display text-lg font-semibold">Nouveau guide</h2>
        <p className="mt-1 text-xs text-[var(--text-muted)]">Choisissez le projet et le titre, puis rédigez en Markdown.</p>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">Créez d'abord un projet dans Administration.</p>
      ) : (
        <div className="grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <div>
            <p className="mb-2 text-sm text-[var(--text-soft)]">Projet</p>
            <Dropdown
              value={projectId}
              onChange={(v) => { setProjectId(v); setError(''); }}
              options={projects.map((p) => ({ value: String(p.id), label: p.name }))}
              ariaLabel="Projet du guide"
              icon={FolderKanban}
              triggerClassName="!h-11 !px-3 text-sm"
            />
          </div>

          <Field label="Titre du guide" htmlFor="guide-title" className="mb-0">
            <div className="field !h-11">
              <input id="guide-title" value={title} onChange={(e) => { setTitle(e.target.value); setError(''); }} placeholder="Démarrer avec NovaPay" maxLength={80} autoComplete="off" />
            </div>
          </Field>

          <button type="submit" disabled={projects.length === 0} className="btn btn-primary">Créer un guide</button>
        </div>
      )}

      {error && <p role="alert" data-tone="danger" className="text-sm text-[var(--tone)]">{error}</p>}
    </form>
  );
};

export default NewGuideForm;
