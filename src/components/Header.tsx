import React from 'react';
import { CheckSquare, Sparkles, LogOut, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  username: string;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ username, onLogout, theme, onToggleTheme }) => {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-2 md:p-3 bg-blue-600 rounded-xl md:rounded-2xl shadow-lg">
            <CheckSquare className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-indigo-400" />
        </div>

        {/* User Menu */}
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            
            <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                <User className="w-3 h-3 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[120px] sm:max-w-none">
                Welcome, {username}
              </span>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 md:px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 
              hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 
              border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 w-full sm:w-auto justify-center"
            title="Sign out"
          >
            <LogOut className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
        Streamline your productivity with intelligent task management. 
        Organize, prioritize, and accomplish your goals with ease.
      </p>
    </div>
  );
};