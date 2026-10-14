import { useCallback, useState } from 'react';
import {
  CURRENT_USER_ID,
  EDITABLE_FIELDS,
  FIELD_LABELS,
  INITIAL_TASKS,
  PROJECTS_BY_ID,
} from '../constants/tasks';
import { moveTask, nextTaskKey } from '../utils/tasks';

// État des tâches. Brancher l'API ici plus tard sans toucher aux composants.
const useTasks = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const addTask = useCallback((data) => {
    setTasks((prev) => {
      const project = PROJECTS_BY_ID[data.projectId];
      const key = nextTaskKey(prev, project);
      const now = Date.now();
      return [
        ...prev,
        {
          ...data,
          id: crypto.randomUUID(),
          key,
          createdAt: now,
          createdBy: CURRENT_USER_ID,
          unread: true,
          starred: false,
          acceptanceCriteria: [],
          endpointIds: [],
          github: null,
          timeline: [
            { id: crypto.randomUUID(), type: 'created', title: 'Tâche créée', detail: `${key} — ${data.title}`, by: CURRENT_USER_ID, at: now },
          ],
        },
      ];
    });
  }, []);

  // Ne retient que les champs modifiables : endpoints, projet et clé restent intacts.
  const updateTask = useCallback((id, patch) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        const safe = Object.fromEntries(Object.entries(patch).filter(([k]) => EDITABLE_FIELDS.includes(k)));
        const changed = Object.keys(safe).filter((k) => JSON.stringify(safe[k]) !== JSON.stringify(task[k]));
        if (changed.length === 0) return task;
        const event = {
          id: crypto.randomUUID(),
          type: 'updated',
          title: 'Tâche modifiée',
          detail: changed.map((k) => FIELD_LABELS[k]).join(', '),
          by: CURRENT_USER_ID,
          at: Date.now(),
        };
        return { ...task, ...safe, timeline: [...task.timeline, event] };
      }),
    );
  }, []);

  const move = useCallback(
    (id, status, beforeId) => setTasks((prev) => moveTask(prev, id, status, beforeId)),
    [],
  );

  const markRead = useCallback(
    (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, unread: false } : t))),
    [],
  );

  const toggleStar = useCallback(
    (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))),
    [],
  );

  return { tasks, addTask, updateTask, move, markRead, toggleStar };
};

export default useTasks;
