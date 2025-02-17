import type { ProjectRepository } from '@/repositories/ProjectRepository';
import type { CreateProjectDTO, Project, UpdateProjectDTO } from '@/types/Project';
import { ProjectStatus } from '@/types/Project';
import { BaseService } from './BaseService';

export class ProjectService extends BaseService {
  constructor(private projectRepository: ProjectRepository) {
    super(projectRepository);
  }

  async getProject(id: number, userId: string): Promise<Project | undefined> {
    return this.projectRepository.findById(id, userId);
  }

  async getAllProjects(userId: string): Promise<Project[]> {
    return this.projectRepository.findAll(userId);
  }

  async createProject(data: CreateProjectDTO, userId: string): Promise<Project> {
    return this.projectRepository.create(data, userId);
  }

  async updateProject(id: number, userId: string, data: UpdateProjectDTO): Promise<Project | undefined> {
    return this.projectRepository.update(id, userId, data);
  }

  async deleteProject(id: number, userId: string): Promise<boolean> {
    return this.projectRepository.delete(id, userId);
  }

  async archiveProject(id: number, userId: string): Promise<Project | undefined> {
    return this.projectRepository.update(id, userId, { status: ProjectStatus.ARCHIVED });
  }

  async completeProject(id: number, userId: string): Promise<Project | undefined> {
    return this.projectRepository.update(id, userId, { status: ProjectStatus.COMPLETED });
  }
}
