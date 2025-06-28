import React, { useState, KeyboardEvent } from 'react';
import { Plus, AlertCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { PriorityLevel } from '../types/Task';

interface TaskInputProps {
  onAddTask: (text: string, priority: PriorityLevel, description?: string, parentId?: string) => void;
  parentId?: string;
  isSubtask?: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, parentId, isSubtask = false }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [isFocused, setIsFocused] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = () => {
    const trimmedText = text.trim();
    if (trimmedText) {
      onAddTask(trimmedText, priority, description.trim() || undefined, parentId);
      setText('');
      setDescription('');
      setPriority('medium');
      setShowDescription(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const priorityOptions: { value: PriorityLevel; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' },
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 
      ${isSubtask ? 'ml-4 md:ml-8 mt-4' : 'mb-6 md:mb-8'}`}>
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Main input row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isSubtask ? "Add a subtask..." : "What needs to be done?"}
              className={`w-full px-3 md:px-4 py-2 md:py-3 text-base md:text-lg rounded-lg md:rounded-xl border-2 transition-all duration-200 
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200
                ${isFocused 
                  ? 'border-blue-400 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                } 
                focus:outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {text.length > 100 && (
              <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
              </div>
            )}
          </div>
        </div>
        
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <div className="flex gap-2 md:gap-3 flex-1">
            <button
              onClick={() => setShowDescription(!showDescription)}
              className={`px-2 md:px-3 py-2 md:py-3 rounded-lg md:rounded-xl border-2 transition-all duration-200 flex items-center gap-1 md:gap-2 flex-1 sm:flex-none justify-center
                ${showDescription 
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                }`}
              title="Add description"
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">Description</span>
              {showDescription ? <ChevronUp className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />}
            </button>
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityLevel)}
              className="px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 dark:border-gray-600 
                focus:border-blue-400 focus:outline-none transition-colors duration-200 
                bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm md:text-base flex-1 sm:flex-none"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-200 flex items-center gap-2 justify-center
              ${text.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base">{isSubtask ? 'Add Subtask' : 'Add Task'}</span>
          </button>
        </div>
      </div>
      
      {showDescription && (
        <div className="mt-3 md:mt-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a description (optional)..."
            rows={3}
            className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 dark:border-gray-600 
              focus:border-blue-400 focus:outline-none transition-colors duration-200 
              bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
              placeholder-gray-400 dark:placeholder-gray-500 resize-none text-sm md:text-base"
          />
        </div>
      )}
      
      {text.length > 100 && (
        <div className="mt-3 text-xs md:text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
          <AlertCircle className="w-3 h-3 md:w-4 md:h-4" />
          Consider breaking this into smaller tasks ({text.length}/100 characters)
        </div>
      )}
    </div>
  );
};