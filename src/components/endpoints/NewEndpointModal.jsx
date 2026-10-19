import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { METHODS } from '../../constants/endpointMeta';
import { Field } from '../ui/Field';
import Dropdown from '../ui/Dropdown';

/** Formulaire de création d'endpoint (fenêtre modale autonome). */
const NewEndpointModal = ({ projects, rows, getCategories, defaultProjectId, onSubmit, onClose }) => {
  const [form, setForm] = useState({
    projectId: defaultProjectId && defaultProjectId !== 'all' ? defaultProjectId : String(projects[0]?.id ?? ''),
    section: '',
    method: 'GET',
    path: '/',
    name: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setError('');
  };

  const project = projects.find((p) => String(p.id) === form.projectId);
  const sections = project ? getCategories(project.id).map((c) => c.name) : [];

  const submit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const section = form.section.trim();
    const path = form.path.trim();

    if (!project) return setError('Choisissez un projet.');
    if (!name) return setError("Saisissez le nom de l'endpoint.");
    if (!section) return setError('Saisissez une section (existante ou nouvelle).');
    if (!/^\/\S*$/.test(path) || path === '/') return setError('Le chemin doit commencer par « / » et ne pas contenir d\u2019espace.');
    if (rows.some((r) => r.project.id === project.id && r.method === form.method && r.path === path)) {
      return setError('Cet endpoint existe déjà dans ce projet.');
    }
    onSubmit({ project, section, method: form.method, path, name });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="floating w-full max-w-lg">
        <form role="dialog" aria-modal="true" aria-labelledby="new-endpoint-title" onSubmit={submit} className="cut-frame space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="new-endpoint-title" className="font-display text-xl font-semibold">Créer un endpoint</h2>
              <p className="mt-1 text-xs text-[var(--text-muted)]">Il sera ajouté en « Planifié » avec une documentation incomplète.</p>
            </div>
            <button type="button" onClick={onClose} className="icon-btn" aria-label="Fermer"><X size={18} /></button>
          </div>

          <Field label="Projet" htmlFor="ne-project">
            <Dropdown
              id="ne-project"
              value={form.projectId}
              onChange={(projectId) => set({ projectId, section: '' })}
              options={projects.map((p) => ({ value: String(p.id), label: p.name }))}
              ariaLabel="Projet"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <Field label="Méthode" htmlFor="ne-method">
              <Dropdown
                id="ne-method"
                value={form.method}
                onChange={(method) => set({ method })}
                options={METHODS.map((method) => ({ value: method, label: method }))}
                ariaLabel="Méthode"
              />
            </Field>
            <Field label="Chemin" htmlFor="ne-path">
              <div className="field"><input id="ne-path" value={form.path} onChange={(e) => set({ path: e.target.value })} placeholder="/payments/{id}" className="font-mono" autoFocus /></div>
            </Field>
          </div>

          <Field label="Nom" htmlFor="ne-name">
            <div className="field"><input id="ne-name" value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="Créer un paiement" /></div>
          </Field>

          <Field label="Section" htmlFor="ne-section" hint="Choisissez une section existante ou saisissez-en une nouvelle.">
            <div className="field">
              <input id="ne-section" list="ne-sections" value={form.section} onChange={(e) => set({ section: e.target.value })} placeholder="Paiements" />
              <datalist id="ne-sections">{sections.map((s) => <option key={s} value={s} />)}</datalist>
            </div>
          </Field>

          {error && <p role="alert" data-tone="danger" className="text-sm text-[var(--tone)]">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn btn-outline">Annuler</button>
            <button type="submit" className="btn btn-primary">Créer l'endpoint</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEndpointModal;
