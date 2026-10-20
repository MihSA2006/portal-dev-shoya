import { useMemo, useState } from 'react';
import NewTaskModal from '../components/tasks/NewTaskModal';
import TaskBoard from '../components/tasks/TaskBoard';
import TasksFilters from '../components/tasks/TasksFilters';
import TasksHeader from '../components/tasks/TasksHeader';
import { ASSIGNEES, CURRENT_CYCLE_ID, CYCLES, PROJECTS, TASK_STATUSES } from '../constants/tasks';
import { useTasksContext } from '../context/TasksContext';
import { filterTasks } from '../utils/tasks';
import { TasksSkeleton } from '../components/ui/LoadingSkeleton';
import useInitialSkeleton from '../hooks/useInitialSkeleton';

const DEFAULT_FILTERS = { project: 'all', assignee: 'all', status: 'all', cycle: CURRENT_CYCLE_ID };

const Tasks = () => {
  const loading = useInitialSkeleton();
  const { tasks, addTask, move, markRead } = useTasksContext();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [creating, setCreating] = useState(false);

  const visibleTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const columns = useMemo(
    () => (filters.status === 'all' ? TASK_STATUSES : TASK_STATUSES.filter((s) => s.id === filters.status)),
    [filters.status],
  );
  const cycle = CYCLES.find((c) => c.id === filters.cycle);

  if (loading) return <TasksSkeleton />;

  // La nouvelle tâche hérite des filtres actifs pour rester visible après création.
  const defaults = {
    projectId: filters.project !== 'all' ? filters.project : PROJECTS[0].id,
    assigneeId: filters.assignee !== 'all' ? filters.assignee : ASSIGNEES[0].id,
    cycleId: filters.cycle !== 'all' ? filters.cycle : CURRENT_CYCLE_ID,
  };

  return (
    <div className="page-content-enter space-y-5">
      <TasksHeader cycle={cycle} />
      <TasksFilters
        filters={filters}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        onCreate={() => setCreating(true)}
      />
      <TaskBoard tasks={visibleTasks} statuses={columns} onMove={move} onRead={markRead} />

      {creating && (
        <NewTaskModal defaults={defaults} onClose={() => setCreating(false)} onCreate={addTask} />
      )}
    </div>
  );
};

export default Tasks;
