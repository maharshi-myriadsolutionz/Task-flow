import { Task, FilterType } from '../types/Task';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const filterTasks = (tasks: Task[], filter: FilterType): Task[] => {
  // Only show top-level tasks (no parentId)
  const topLevelTasks = tasks.filter(task => !task.parentId);
  
  switch (filter) {
    case 'active':
      return topLevelTasks.filter(task => !task.completed);
    case 'completed':
      return topLevelTasks.filter(task => task.completed);
    default:
      return topLevelTasks;
  }
};

export const getSubtasks = (tasks: Task[], parentId: string): Task[] => {
  return tasks.filter(task => task.parentId === parentId);
};

export const sortTasksByPriority = (tasks: Task[]): Task[] => {
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};

export const getTaskStats = (tasks: Task[]) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { total, completed, active, completionRate };
};

export const getPriorityColor = (priority: Task['priority'], completed: boolean = false) => {
  if (completed) return 'text-gray-400 dark:text-gray-500';
  
  switch (priority) {
    case 'high':
      return 'text-red-500 dark:text-red-400';
    case 'medium':
      return 'text-yellow-500 dark:text-yellow-400';
    case 'low':
      return 'text-green-500 dark:text-green-400';
    default:
      return 'text-gray-500 dark:text-gray-400';
  }
};

export const getPriorityBadgeColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
    case 'medium':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
    case 'low':
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
  }
};