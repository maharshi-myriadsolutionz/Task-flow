import React from 'react';
import { BarChart3, Target, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    completionRate: number;
  };
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  if (stats.total === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
      rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border border-blue-100 dark:border-blue-800">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="p-1.5 md:p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
          <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">Progress Overview</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
        {/* Completion Rate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</span>
            <Target className="w-3 h-3 md:w-4 md:h-4 text-green-500 dark:text-green-400" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{stats.completionRate}%</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-1.5 md:h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Active Tasks</span>
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 dark:text-yellow-400" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.active}</div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            {stats.active === 1 ? 'task remaining' : 'tasks remaining'}
          </div>
        </div>

        {/* Total Completed */}
        <div className="bg-white dark:bg-gray-800 rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Completed</span>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
            </div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">{stats.completed}</div>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            of {stats.total} total {stats.total === 1 ? 'task' : 'tasks'}
          </div>
        </div>
      </div>
    </div>
  );
};