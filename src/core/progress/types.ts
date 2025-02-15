export type TaskType = 'feature' | 'fix' | 'docs' | 'test' | 'refactor' | 'chore';
export type TaskComplexity = 'easy' | 'medium' | 'hard' | 'critical';
export type TaskStatus = 'done' | 'in-progress' | 'planned' | 'blocked';

export interface ProgressEntry {
  id: string;
  type: TaskType;
  title: string;
  description?: string;
  complexity: TaskComplexity;
  status: TaskStatus;
  timestamp: string;
  sprint?: string;
  tags?: string[];
  blockedBy?: string[];
}

export interface Blocker {
  id: number;
  feature: string;
  reason: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  goals: string[];
  completedGoals: string[];
  blockers: Blocker[];
}

export interface ProgressData {
  entries: ProgressEntry[];
  sprints: Sprint[];
  blockers: Blocker[];
  currentSprint?: string;
}

export interface ProgressConfig {
  storage: {
    path: string;
    format: 'json' | 'yaml';
  };
  reporting: {
    progressFile: string;
    roadmapFile: string;
    sprintReportsPath: string;
  };
  github?: {
    token?: string;
    repository?: string;
    projectId?: number;
  };
  jira?: {
    host?: string;
    token?: string;
    projectKey?: string;
  };
}

// Emoji mappings for visual representation
export const COMPLEXITY_EMOJI = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
  critical: '⚫'
} as const;

export const STATUS_EMOJI = {
  'done': '✅',
  'in-progress': '🚧',
  'planned': '⏳',
  'blocked': '❌'
} as const;

export const TYPE_EMOJI = {
  feature: '✨',
  fix: '🐛',
  docs: '📝',
  test: '🧪',
  refactor: '♻️',
  chore: '🔧'
} as const;
