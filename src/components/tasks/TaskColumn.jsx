import { Inbox } from 'lucide-react';
import { ASSIGNEES_BY_ID, PROJECTS_BY_ID } from '../../constants/tasks';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, dragId, isOver, onDragOver, onDragLeave, onDrop, onDragStart, onDragEnd, onRead }) => (
  <div
    className={`task-col ${isOver ? 'is-over' : ''}`}
    data-tone={status.tone}
    onDragOver={(e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      onDragOver(status.id);
    }}
    onDragLeave={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) onDragLeave();
    }}
    onDrop={(e) => {
      e.preventDefault();
      onDrop(status.id, null);
    }}
  >
    <section className="task-column cut-frame" aria-label={status.label}>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--tone)]" />
        <h2 className="flex-1 truncate font-display text-sm font-semibold text-[var(--tone)]">{status.label}</h2>
        <span className="tone-badge min-w-7 px-2 py-0.5 text-center text-xs font-semibold">{tasks.length}</span>
      </div>
      <div className="mx-4 h-[3px] bg-[var(--tone)] opacity-70" />

      <div className="flex flex-col gap-3 p-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            project={PROJECTS_BY_ID[task.projectId]}
            assignee={ASSIGNEES_BY_ID[task.assigneeId]}
            isDragging={dragId === task.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDropOn={(beforeId) => onDrop(status.id, beforeId)}
            onRead={onRead}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center px-4 py-10 text-center">
            <Inbox className="mb-3 text-[var(--tone)]" size={30} strokeWidth={1.5} />
            <p className="font-medium">Aucune tâche</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Glissez une tâche ici pour la placer dans cette colonne.</p>
          </div>
        )}
      </div>
    </section>
  </div>
);

export default TaskColumn;
