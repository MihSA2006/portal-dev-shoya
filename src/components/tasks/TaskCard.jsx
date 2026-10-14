import { Box, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { taskPath } from '../../constants/tasks';
import { getInitials, timeAgo } from '../../utils/tasks';

const TaskCard = ({ task, project, assignee, isDragging, onDragStart, onDragEnd, onDropOn, onRead }) => {
  const navigate = useNavigate();

  const open = () => {
    if (task.unread) onRead(task.id);
    navigate(taskPath(task.key));
  };

  return (
    <div
      className={`task-card-wrap ${isDragging ? 'is-dragging' : ''}`}
      draggable
      role="link"
      tabIndex={0}
      aria-label={`${task.key} — ${task.title}`}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id);
        onDragStart(task.id);
      }}
      onDragEnd={onDragEnd}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation(); // évite le drop "fin de colonne"
        onDropOn(task.id);
      }}
      onClick={open}
      onKeyDown={(e) => e.key === 'Enter' && open()}
    >
      <article className="task-card cut-frame cut-sm space-y-3 p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 bg-[var(--tone)]" />
          <span className="text-sm font-medium text-[var(--tone)]">{task.key}</span>
          {task.unread && <span className="unread-dot ml-auto" title="Nouvelle tâche" />}
        </div>

        <div>
          <h3 className="font-display text-base font-medium leading-snug">{task.title}</h3>
          {task.description && (
            <p className="clamp-2 mt-1.5 text-sm text-[var(--text-muted)]" title={task.description}>
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center border border-[var(--tone)] bg-[var(--accent-tint)] text-[11px] font-semibold text-[var(--text)]">
            {getInitials(assignee?.label)}
          </span>
          <span className="truncate text-sm text-[var(--text-soft)]">{assignee?.label ?? 'Non assigné'}</span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-muted)]">
          <span className="flex min-w-0 items-center gap-2">
            <Box className="shrink-0 text-[var(--accent)]" size={15} />
            <span className="truncate">{project?.label}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <Clock size={14} />
            {timeAgo(task.createdAt)}
          </span>
        </div>
      </article>
    </div>
  );
};

export default TaskCard;
