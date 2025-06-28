import React from 'react';
import { List, Clock, CheckCircle2 } from 'lucide-react';
import { FilterType } from '../types/Task';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
  taskCounts,
}) => {
  const filters: Array<{
    key: FilterType;
    label: string;
    icon: React.ReactNode;
    count: number;
    color: string;
  }> = [
    {
      key: 'all',
      label: 'All Tasks',
      icon: <List className="w-3 h-3 md:w-4 md:h-4" />,
      count: taskCounts.all,
      color: 'blue',
    },
    {
      key: 'active',
      label: 'Active',
      icon: <Clock className="w-3 h-3 md:w-4 md:h-4" />,
      count: taskCounts.active,
      color: 'yellow',
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" />,
      count: taskCounts.completed,
      color: 'green',
    },
  ];

  const getButtonStyles = (filter: typeof filters[0], isActive: boolean) => {
    const baseStyles = 'flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl font-medium transition-all duration-200 relative text-sm md:text-base';
    
    if (isActive) {
      switch (filter.color) {
        case 'blue':
          return `${baseStyles} bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm`;
        case 'yellow':
          return `${baseStyles} bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 shadow-sm`;
        case 'green':
          return `${baseStyles} bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 shadow-sm`;
        default:
          return `${baseStyles} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm`;
      }
    }
    
    return `${baseStyles} text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200`;
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.key;
        
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={getButtonStyles(filter, isActive)}
          >
            {filter.icon}
            <span className="hidden sm:inline">{filter.label}</span>
            <span className="sm:hidden">{filter.key === 'all' ? 'All' : filter.key === 'active' ? 'Active' : 'Done'}</span>
            {filter.count > 0 && (
              <span className={`inline-flex items-center justify-center px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-bold rounded-full min-w-[16px] md:min-w-[20px] h-4 md:h-5
                ${isActive 
                  ? 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                {filter.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};