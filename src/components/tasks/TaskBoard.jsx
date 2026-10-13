import { useMemo, useState } from 'react';
import { groupByStatus } from '../../utils/tasks';
import TaskColumn from './TaskColumn';

// Drag & drop natif HTML5 : aucune dépendance à installer.
const TaskBoard = ({ tasks, statuses, onMove, onRead }) => {
  const [dragId, setDragId] = useState(null);
  const [overStatus, setOverStatus] = useState(null);

  const grouped = useMemo(() => groupByStatus(tasks, statuses), [tasks, statuses]);

  const reset = () => {
    setDragId(null);
    setOverStatus(null);
  };

  const handleDrop = (statusId, beforeId) => {
    if (dragId) onMove(dragId, statusId, beforeId);
    reset();
  };

  return (
    <div className="flex items-start gap-4 overflow-x-auto pb-2">
      {statuses.map((status) => (
        <TaskColumn
          key={status.id}
          status={status}
          tasks={grouped[status.id]}
          dragId={dragId}
          isOver={dragId !== null && overStatus === status.id}
          onDragOver={setOverStatus}
          onDragLeave={() => setOverStatus(null)}
          onDrop={handleDrop}
          onDragStart={setDragId}
          onDragEnd={reset}
          onRead={onRead}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
