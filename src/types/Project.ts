export type Project = {
  id: number;
  name: string;
  description: string | null | undefined;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type ProjectCardProps = {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
};

export type ProjectListProps = {
  projects: Project[];
};

export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export type CreateProjectDTO = {
  name: string;
  description?: string | null | undefined;
  status: ProjectStatus;
};

export type UpdateProjectDTO = {
  status?: ProjectStatus;
} & Partial<CreateProjectDTO>;
