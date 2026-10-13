import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ASSIGNEES, CYCLES, DESCRIPTION_MAX_LENGTH, PROJECTS, TASK_STATUSES } from '../../constants/tasks';
import Dropdown from '../ui/Dropdown';

const Row = ({ label, children }) => (
  <div>
    <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{label}</span>
    {children}
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <Dropdown
    value={value}
    onChange={onChange}
    options={options.map(({ id, label: optionLabel }) => ({ value: id, label: optionLabel }))}
    ariaLabel={label}
  />
);

// Monté uniquement quand il est ouvert : le formulaire repart à zéro à chaque ouverture.
const NewTaskModal = ({ defaults, onClose, onCreate }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'planned',
    projectId: defaults.projectId,
    assigneeId: defaults.assigneeId,
    cycleId: defaults.cycleId,
  });
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    titleRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const submit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) {
      setError('Le titre est obligatoire.');
      titleRef.current?.focus();
      return;
    }
    onCreate({ ...form, title, description: form.description.trim() });
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="floating w-full max-w-lg">
        <form
          className="cut-frame anim-pop space-y-4 p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-task-title"
          onSubmit={submit}
        >
          <div className="flex items-center justify-between">
            <h2 id="new-task-title" className="font-display text-xl font-semibold">Créer une tâche</h2>
            <button className="icon-btn" type="button" onClick={onClose} aria-label="Fermer">
              <X size={18} />
            </button>
          </div>

          <Row label="Titre">
            <span className="field">
              <input
                id="task-title"
                ref={titleRef}
                value={form.title}
                maxLength={120}
                placeholder="Ex. : Implémenter le endpoint de paiement"
                onChange={(e) => {
                  set('title')(e.target.value);
                  if (error) setError('');
                }}
              />
            </span>
            {error && <span className="mt-1 block text-sm text-[var(--danger)]">{error}</span>}
          </Row>

          <Row label="Description">
            <span className="field !h-auto items-start py-2">
              <textarea
                id="task-description"
                rows={4}
                value={form.description}
                maxLength={DESCRIPTION_MAX_LENGTH}
                className="resize-none"
                placeholder="Décrivez brièvement la tâche."
                onChange={(e) => set('description')(e.target.value)}
              />
            </span>
            <span className="mt-1 block text-right text-xs text-[var(--text-muted)]">
              {form.description.length}/{DESCRIPTION_MAX_LENGTH}
            </span>
          </Row>

          <div className="grid gap-4 sm:grid-cols-2">
            <Row label="Projet">
              <Select label="Projet" value={form.projectId} onChange={set('projectId')} options={PROJECTS} />
            </Row>
            <Row label="Assigné">
              <Select label="Assigné" value={form.assigneeId} onChange={set('assigneeId')} options={ASSIGNEES} />
            </Row>
            <Row label="Statut">
              <Select label="Statut" value={form.status} onChange={set('status')} options={TASK_STATUSES} />
            </Row>
            <Row label="Cycle">
              <Select label="Cycle" value={form.cycleId} onChange={set('cycleId')} options={CYCLES} />
            </Row>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button className="btn btn-outline" type="button" onClick={onClose}>Annuler</button>
            <button className="btn btn-primary" type="submit">Créer la tâche</button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default NewTaskModal;
