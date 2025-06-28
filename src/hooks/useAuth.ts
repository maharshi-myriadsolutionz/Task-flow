import { useState, useEffect } from 'react';
import { User } from '../types/Auth';

const VALID_CREDENTIALS = {
  username: 'maharshi',
  password: 'Myriad7yr'
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('taskflow-user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (username: string, password: string): boolean => {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      const authenticatedUser: User = {
        username,
        isAuthenticated: true
      };
      setUser(authenticatedUser);
      localStorage.setItem('taskflow-user', JSON.stringify(authenticatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow-user');
    localStorage.removeItem('taskflow-tasks');
    localStorage.removeItem('taskflow-filter');
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: user?.isAuthenticated || false
  };
}