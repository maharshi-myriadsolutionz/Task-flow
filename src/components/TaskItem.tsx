import React, { useState } from 'react';
import { Check, X, Edit3, Flag, Calendar, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Task } from '../types/Task';
import { TaskInput } from './TaskInput';
import { getPriorityBadgeColor } from '../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string, description?: string) => void;
  onAddSubtask: (text: string, priority: Task['priority'], description?: string, parentId?: string) => void;
  subtasks?: Task[];
  level?: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onAddSubtask,
  subtasks = [],
  level = 0,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [showAddSubtask, setShowAddSubtask] = useState(false);

  const handleSaveEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && (trimmedText !== task.text || editDescription !== task.description)) {
      onEditTask(task.id, trimmedText, editDescription.trim() || undefined);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const hasSubtasks = subtasks.length > 0;
  const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-lg md:rounded-xl border-2 transition-all duration-300 hover:shadow-lg
      ${task.completed 
        ? 'border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/10' 
        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      } ${level > 0 ? 'ml-4 md:ml-8 mt-2' : ''}`}>
      <div className="p-3 md:p-5">
        <div className="flex items-start gap-2 md:gap-4">
          {/* Expand/Collapse Button for Subtasks */}
          {hasSubtasks && (
            <button
              onClick={() => setShowSubtasks(!showSubtasks)}
              className="flex-shrink-0 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showSubtasks ? <ChevronDown className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />}
            </button>
          )}

          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center
              ${task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
          >
            {task.completed && <Check className="w-3 h-3 md:w-4 md:h-4" />}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSaveEdit()}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                    focus:outline-none focus:border-blue-400 bg-white dark:bg-gray-700 
                    text-gray-800 dark:text-gray-200 text-sm md:text-base"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Add description..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                    focus:outline-none focus:border-blue-400 bg-white dark:bg-gray-700 
                    text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none text-sm md:text-base"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-blue-600 text-white text-xs md:text-sm rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs md:text-sm rounded-md 
                      hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-2">
                  <p className={`text-base md:text-lg leading-relaxed transition-all duration-200 flex-1
                    ${task.completed 
                      ? 'text-gray-500 dark:text-gray-400 line-through' 
                      : 'text-gray-800 dark:text-gray-200'
                    }`}>
                    {task.text}
                  </p>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Priority Badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border
                      ${getPriorityBadgeColor(task.priority)}`}>
                      <Flag className="w-2 h-2 md:w-3 md:h-3" />
                      <span className="hidden sm:inline">{task.priority}</span>
                    </span>

                    {/* Subtask Progress */}
                    {hasSubtasks && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full 
                        bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {completedSubtasks}/{subtasks.length}
                        <span className="hidden sm:inline">subtasks</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description - Always visible if exists */}
                {task.description && (
                  <div className="mb-3">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-2 md:p-3 rounded-lg">
                      {task.description}
                    </p>
                  </div>
                )}

                {/* Task Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Created {formatDate(task.createdAt)}</span>
                  </div>
                  {task.completedAt && (
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Completed {formatDate(task.completedAt)}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          {!isEditing && (
            <div className="flex-shrink-0 flex items-center gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setShowAddSubtask(!showAddSubtask)}
                className="p-1 md:p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 
                  hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-200"
                title="Add subtask"
              >
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 md:p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 
                  hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Edit task"
              >
                <Edit3 className="w-3 h-3 md:w-4 md:h-4" />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="p-1 md:p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 
                  hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                title="Delete task"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Subtask Form */}
      {showAddSubtask && (
        <div className="px-3 md:px-5 pb-3 md:pb-5">
          <TaskInput
            onAddTask={(text, priority, description) => {
              onAddSubtask(text, priority, description, task.id);
              setShowAddSubtask(false);
            }}
            parentId={task.id}
            isSubtask={true}
          />
        </div>
      )}

      {/* Subtasks */}
      {hasSubtasks && showSubtasks && (
        <div className="border-t border-gray-100 dark:border-gray-700 pt-2 md:pt-4 pb-2">
          {subtasks.map((subtask) => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
              onEditTask={onEditTask}
              onAddSubtask={onAddSubtask}
              subtasks={[]}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};