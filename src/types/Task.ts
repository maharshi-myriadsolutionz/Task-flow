export interface Task {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completedAt?: Date;
  parentId?: string;
  subtasks?: Task[];
}

export type FilterType = 'all' | 'active' | 'completed';

export type PriorityLevel = Task['priority'];