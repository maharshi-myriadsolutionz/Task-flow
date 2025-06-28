import React, { useMemo } from 'react';
import { Task, FilterType, PriorityLevel } from './types/Task';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { FilterButtons } from './components/FilterButtons';
import { TaskStats } from './components/TaskStats';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';
import { generateId, getTaskStats } from './utils/taskUtils';

function App() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', []);
  const [currentFilter, setCurrentFilter] = useLocalStorage<FilterType>('taskflow-filter', 'all');

  const taskStats = useMemo(() => getTaskStats(tasks), [tasks]);
  
  const taskCounts = useMemo(() => ({
    all: tasks.filter(task => !task.parentId).length,
    active: tasks.filter(task => !task.completed && !task.parentId).length,
    completed: tasks.filter(task => task.completed && !task.parentId).length,
  }), [tasks]);

  const addTask = (text: string, priority: PriorityLevel, description?: string, parentId?: string) => {
    const newTask: Task = {
      id: generateId(),
      text,
      description,
      completed: false,
      priority,
      createdAt: new Date(),
      parentId,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { 
              ...task, 
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined
            }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => {
      // Also delete all subtasks
      const taskToDelete = prevTasks.find(task => task.id === id);
      if (taskToDelete) {
        return prevTasks.filter(task => 
          task.id !== id && task.parentId !== id
        );
      }
      return prevTasks.filter(task => task.id !== id);
    });
  };

  const editTask = (id: string, newText: string, description?: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText, description } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Header with User Info */}
        <Header 
          username={user!.username} 
          onLogout={logout} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Task Input */}
        <TaskInput onAddTask={addTask} />

        {/* Task Statistics */}
        <TaskStats stats={taskStats} />

        {/* Filter Buttons */}
        <FilterButtons
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          taskCounts={taskCounts}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          currentFilter={currentFilter}
          onToggleComplete={toggleTaskComplete}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
          onAddSubtask={addTask}
          onClearCompleted={clearCompleted}
        />

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="text-center mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm px-4">
              Keep up the great work! You've got {taskCounts.active} tasks left to conquer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;