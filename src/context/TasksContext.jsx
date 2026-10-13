import { createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';

const TasksContext = createContext(null);

// Partage les tâches entre la liste (Tasks) et le détail (TaskDetail).
export const TasksProvider = ({ children }) => {
  const value = useTasks();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasksContext doit être utilisé dans <TasksProvider>.');
  return context;
};
