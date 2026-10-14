import { Calendar, FileText, Link2, RefreshCw, User, UserPlus } from 'lucide-react';
import { ASSIGNEES, CYCLES, DESCRIPTION_MAX_LENGTH } from '../../../constants/tasks';
import { cycleProgress, formatDateTime, getInitials, timeAgo } from '../../../utils/tasks';
import AcceptanceCriteria from './AcceptanceCriteria';
import DetailCard from './DetailCard';
import EndpointChip from './EndpointChip';
import SelectField from './SelectField';

const Meta = ({ icon: Icon, label, children }) => (
  <div className="flex gap-3">
    <Icon className="mt-0.5 shrink-0 text-[var(--accent)]" size={20} />
    <div className="min-w-0 flex-1">
      <dt className="text-sm text-[var(--text-muted)]">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  </div>
);

const Person = ({ user }) =>
  user ? (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--border-strong)] bg-[var(--accent-tint)] text-xs font-semibold">
        {getInitials(user.label)}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-medium">{user.label}</p>
        <p className="truncate text-xs text-[var(--text-muted)]">{user.role}</p>
      </div>
    </div>
  ) : (
    <p className="text-sm text-[var(--text-muted)]">Non assigné</p>
  );

const TaskInfoCard = ({ task, view, editing, endpoints, assignee, createdBy, cycle, onChange }) => {
  const progress = cycleProgress(cycle);

  return (
    <DetailCard
      icon={FileText}
      title="Informations"
      className={editing ? '[--frame-border:var(--accent)]' : ''}
    >
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-base font-semibold">Description</h3>
            {editing ? (
              <>
                <label className="sr-only" htmlFor="task-detail-description">Description</label>
                <span className="field mt-3 !h-auto items-start py-2">
                  <textarea
                    id="task-detail-description"
                    rows={6}
                    className="resize-y"
                    value={view.description}
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    placeholder="Décrivez la tâche."
                    onChange={(e) => onChange('description', e.target.value)}
                  />
                </span>
                <span className="mt-1 block text-right text-xs text-[var(--text-muted)]">
                  {view.description.length}/{DESCRIPTION_MAX_LENGTH}
                </span>
              </>
            ) : (
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[var(--text-soft)]">
                {task.description || <span className="text-[var(--text-muted)]">Aucune description.</span>}
              </p>
            )}
          </div>

          <div className="border-t border-[var(--border)] pt-6">
            <AcceptanceCriteria
              items={view.acceptanceCriteria}
              editing={editing}
              onChange={(items) => onChange('acceptanceCriteria', items)}
            />
          </div>
        </div>

        <dl className="space-y-5 md:border-l md:border-[var(--border)] md:pl-6">
          <Meta icon={Link2} label="Endpoints liés">
            {endpoints.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {endpoints.map((ep) => <EndpointChip key={ep.id} endpoint={ep} />)}
              </div>
            ) : (
              <p className="text-sm text-[var(--text-muted)]">Aucun endpoint lié.</p>
            )}
            {editing && (
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Les endpoints se gèrent depuis la documentation et ne sont pas modifiables ici.
              </p>
            )}
          </Meta>

          <Meta icon={User} label="Assigné">
            {editing ? (
              <SelectField id="task-detail-assignee" label="Assigné" value={view.assigneeId}
                onChange={(v) => onChange('assigneeId', v)} options={ASSIGNEES} />
            ) : (
              <Person user={assignee} />
            )}
          </Meta>

          <Meta icon={UserPlus} label="Créé par"><Person user={createdBy} /></Meta>

          <Meta icon={Calendar} label="Date de création">
            <p className="text-sm">{formatDateTime(task.createdAt)}</p>
            <p className="text-xs text-[var(--text-muted)]">({timeAgo(task.createdAt)})</p>
          </Meta>

          <Meta icon={RefreshCw} label="Cycle">
            {editing ? (
              <SelectField id="task-detail-cycle" label="Cycle" value={view.cycleId}
                onChange={(v) => onChange('cycleId', v)} options={CYCLES} />
            ) : (
              <p className="text-sm">{cycle ? `${cycle.label} — ${cycle.duration}` : '—'}</p>
            )}
            {cycle && (
              <div className="mt-2 flex items-center gap-2" data-tone="accent">
                <div className="doc-progress flex-1" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Avancement du cycle">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <span className="text-xs text-[var(--text-muted)]">{progress}%</span>
              </div>
            )}
          </Meta>
        </dl>
      </div>
    </DetailCard>
  );
};

export default TaskInfoCard;
