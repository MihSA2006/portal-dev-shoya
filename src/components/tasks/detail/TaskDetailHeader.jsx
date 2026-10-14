import { Code2, Pencil, Save, Star, X } from 'lucide-react';
import { TASK_STATUSES } from '../../../constants/tasks';
import SelectField from './SelectField';

const TaskDetailHeader = ({
  task, project, status, editing, draft, error,
  onChange, onEdit, onCancel, onSave, onToggleStar,
}) => (
  <header className="cut-frame overview-hero flex flex-wrap items-start gap-5 p-5">
    <div className="grid h-14 w-14 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-[var(--accent)]">
      <Code2 size={28} />
    </div>

    <div className="min-w-0 flex-1 basis-72">
      {editing ? (
        <>
          <p className="font-display text-xl font-semibold text-[var(--accent)]">{task.key}</p>
          <label className="sr-only" htmlFor="task-detail-title">Titre</label>
          <span className="field mt-2">
            <input
              id="task-detail-title"
              value={draft.title}
              maxLength={120}
              aria-invalid={Boolean(error)}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </span>
          {error && <p className="mt-1 text-sm text-[var(--danger)]" role="alert">{error}</p>}
        </>
      ) : (
        <h1 className="font-display text-2xl font-semibold leading-tight">
          <span className="text-[var(--accent)]">{task.key}</span>
          <span className="mx-3 text-[var(--text-muted)]">—</span>
          {task.title}
        </h1>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {editing ? (
          <SelectField id="task-detail-status" label="Statut" value={draft.status}
            onChange={(v) => onChange('status', v)} options={TASK_STATUSES} className="!h-9 !w-auto" />
        ) : (
          <span className="tone-badge px-3 py-1 text-sm font-medium" data-tone={status.tone}>{status.label}</span>
        )}
        <span className="h-5 w-px bg-[var(--border-strong)]" />
        <span className="text-sm text-[var(--text-soft)]">
          Projet : <span className="text-[var(--accent)]">{project?.label}</span>
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <button className="btn btn-outline" type="button" onClick={onCancel}>
            <X size={17} />
            Annuler
          </button>
          <button className="btn btn-primary" type="button" onClick={onSave}>
            <Save size={17} />
            Enregistrer
          </button>
        </>
      ) : (
        <>
          <button
            className="icon-btn border border-[var(--border)]"
            type="button"
            onClick={onToggleStar}
            aria-pressed={task.starred}
            aria-label={task.starred ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Star size={17} className={task.starred ? 'fill-[var(--role-admin)] text-[var(--role-admin)]' : ''} />
          </button>
          <button className="btn btn-outline" type="button" onClick={onEdit}>
            <Pencil size={16} />
            Modifier
          </button>
        </>
      )}
    </div>
  </header>
);

export default TaskDetailHeader;
