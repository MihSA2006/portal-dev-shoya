import { useState } from 'react';
import { AlertTriangle, Check, Link2, Loader2, Save, Trash2 } from 'lucide-react';
import { isProjectValid } from '../../constants/projects.js';
import useGithubTest from '../../hooks/useGithubTest.js';
import Modal from '../ui/Modal.jsx';
import ProjectHeader from './Downloads/ProjectHeader.jsx';
import ProjectTabs from './Downloads/ProjectTabs.jsx';
import GeneralTab from './tabs/GeneralTab.jsx';
import DescriptionTab from './tabs/DescriptionTab.jsx';
import GithubTab from './tabs/GithubTab.jsx';

/** Panneau de détail. Utiliser key={project.id} pour réinitialiser le brouillon à chaque projet. */
const ProjectDetail = ({ project, onSave, onDelete }) => {
  const [draft, setDraft] = useState(project);
  const [tab, setTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const test = useGithubTest(draft.repo);

  const change = (patch) => {
    setDraft((d) => ({ ...d, ...patch }));
    setSaved(false);
  };

  const dirty = JSON.stringify(draft) !== JSON.stringify(project);
  const testResult = {
    loading: 'Vérification en cours...',
    ok: 'Connexion réussie : le dépôt est accessible.',
    error: 'Dépôt introuvable. Vérifiez le format organisation/depot.',
  }[test.state];

  const save = () => {
    onSave(draft);
    setSaved(true);
  };

  return (
    <div className="floating lg:h-full lg:min-h-0">
      <section className="cut-frame flex flex-col overflow-hidden p-5 sm:p-6 lg:h-full lg:min-h-0">
        <div className="shrink-0">
          <ProjectHeader project={draft} valid={isProjectValid(draft)} />

          <div className="mt-6">
            <ProjectTabs active={tab} onChange={setTab} />
          </div>
        </div>

        <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="animate-enter pt-6 lg:min-h-0 lg:flex-1 lg:overflow-y-auto" key={tab}>
          {tab === 'general' && <GeneralTab draft={draft} onChange={change} />}
          {tab === 'description' && <DescriptionTab draft={draft} onChange={change} />}
          {tab === 'github' && <GithubTab draft={draft} onChange={change} />}
        </div>

        <footer className="mt-4 flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-[var(--border)] pt-4">
          {testResult && (
            <p role="status" className={`mr-auto text-sm ${
              test.state === 'error' ? 'text-[var(--danger)]' : test.state === 'ok' ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
            }`}>
              {testResult}
            </p>
          )}
          <button
            type="button"
            className="btn btn-outline !border-[var(--danger)] !bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] !text-[var(--danger)] hover:!bg-[var(--danger)] hover:!text-white"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 size={16} />
            Supprimer
          </button>
          <button type="button" className="btn btn-outline" onClick={test.run} disabled={test.state === 'loading'}>
            {test.state === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Link2 size={16} />}
            Tester la connexion GitHub
          </button>
          <button type="button" className="btn btn-primary" onClick={save} disabled={!dirty && !saved}>
            {saved && !dirty ? <Check size={17} /> : <Save size={17} />}
            {saved && !dirty ? 'Modifications enregistrées' : 'Enregistrer'}
          </button>
        </footer>
      </section>
      {confirmDelete && (
        <Modal
          title="Supprimer le projet"
          description="Cette action est définitive et ne peut pas être annulée."
          onClose={() => setConfirmDelete(false)}
        >
          <div className="space-y-5 px-6 py-5">
            <div className="flex items-start gap-3 border border-[var(--danger)] bg-[color-mix(in_srgb,var(--danger)_8%,var(--surface))] p-4">
              <AlertTriangle className="mt-0.5 shrink-0 text-[var(--danger)]" size={20} />
              <p className="text-sm text-[var(--text-soft)]">
                Voulez-vous vraiment supprimer le projet <strong className="text-[var(--text)]">{project.name}</strong> ?
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn btn-outline" onClick={() => setConfirmDelete(false)}>
                Annuler
              </button>
              <button
                type="button"
                className="btn border-[var(--danger)] bg-[var(--danger)] text-white hover:opacity-90"
                onClick={() => onDelete(project.id)}
              >
                <Trash2 size={16} />
                Confirmer la suppression
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProjectDetail;
