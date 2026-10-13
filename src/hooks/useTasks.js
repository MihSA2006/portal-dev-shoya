import { useCallback, useState } from 'react';
import { INITIAL_TASKS, PROJECTS_BY_ID } from '../constants/tasks';
import { moveTask, nextTaskKey } from '../utils/tasks';

// État local des tâches. Brancher l'API ici plus tard sans toucher aux composants.
const useTasks = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const addTask = useCallback((data) => {
    setTasks((prev) => {
      const project = PROJECTS_BY_ID[data.projectId];
      return [
        ...prev,
        {
          ...data,
          id: crypto.randomUUID(),
          key: nextTaskKey(prev, project),
          createdAt: Date.now(),
          unread: true,
        },
      ];
    });
  }, []);

  const move = useCallback(
    (id, status, beforeId) => setTasks((prev) => moveTask(prev, id, status, beforeId)),
    [],
  );

  const markRead = useCallback(
    (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t))),
    [],
  );

  return { tasks, addTask, move, markRead };
};

export default useTasks;
