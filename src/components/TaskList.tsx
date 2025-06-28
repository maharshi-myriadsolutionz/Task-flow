import React, { useState } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';
import { Task, FilterType } from '../types/Task';
import { TaskItem } from './TaskItem';
import { filterTasks, sortTasksByPriority, getSubtasks } from '../utils/taskUtils';

interface TaskListProps {
  tasks: Task[];
  currentFilter: FilterType;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string, description?: string) => void;
  onAddSubtask: (text: string, priority: Task['priority'], description?: string, parentId?: string) => void;
  onClearCompleted: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  currentFilter,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAddSubtask,
  onClearCompleted,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredTasks = filterTasks(tasks, currentFilter);
  const sortedTasks = sortTasksByPriority(filteredTasks);
  const completedTasks = tasks.filter(task => task.completed);

  const handleClearCompleted = () => {
    onClearCompleted();
    setShowClearConfirm(false);
  };

  const getEmptyStateMessage = () => {
    switch (currentFilter) {
      case 'active':
        return {
          title: "All caught up! 🎉",
          subtitle: "No active tasks remaining. Time to add some new goals!",
        };
      case 'completed':
        return {
          title: "No completed tasks yet",
          subtitle: "Complete some tasks to see them here.",
        };
      default:
        return {
          title: "Ready to get organized?",
          subtitle: "Add your first task above to get started with TaskFlow.",
        };
    }
  };

  if (sortedTasks.length === 0) {
    const emptyState = getEmptyStateMessage();
    return (
      <div className="text-center py-12 md:py-16">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
          <RotateCcw className="w-8 h-8 md:w-12 md:h-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{emptyState.title}</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto px-4">{emptyState.subtitle}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Clear Completed Button */}
      {completedTasks.length > 0 && currentFilter !== 'active' && (
        <div className="flex justify-end mb-3 md:mb-4">
          {!showClearConfirm ? (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm text-red-600 dark:text-red-400 
                hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 
                rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Clear Completed ({completedTasks.length})</span>
              <span className="sm:hidden">Clear ({completedTasks.length})</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2 bg-red-50 dark:bg-red-900/20 px-3 md:px-4 py-2 rounded-lg 
              border border-red-200 dark:border-red-800">
              <span className="text-xs md:text-sm text-red-700 dark:text-red-300 text-center sm:text-left">
                Clear {completedTasks.length} completed tasks?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleClearCompleted}
                  className="px-3 py-1 bg-red-600 text-white text-xs md:text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs md:text-sm rounded-md 
                    hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Task Items */}
      <div className="space-y-2 md:space-y-3">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onAddSubtask={onAddSubtask}
            subtasks={getSubtasks(tasks, task.id)}
          />
        ))}
      </div>
    </div>
  );
};