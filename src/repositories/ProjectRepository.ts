import type { CreateProjectDTO, Project, ProjectStatus, UpdateProjectDTO } from '@/types/Project';
import { projectSchema } from '@/models/Schema';
import { and, eq } from 'drizzle-orm';
import { BaseRepository } from './BaseRepository';

export class ProjectRepository extends BaseRepository {
  async findById(id: number, userId: string): Promise<Project | undefined> {
    const result = await this.db
      .select()
      .from(projectSchema)
      .where(and(eq(projectSchema.id, id), eq(projectSchema.userId, userId)))
      .limit(1);

    if (!result[0]) {
      throw new Error('Failed to create project');
    }
    return { ...result[0], status: result[0].status as ProjectStatus };
  }

  async findAll(userId: string): Promise<Project[]> {
    const result = await this.db
      .select()
      .from(projectSchema)
      .where(eq(projectSchema.userId, userId));

    return result.map(project => ({ ...project, status: project.status as ProjectStatus }));
  }

  async create(data: CreateProjectDTO, userId: string): Promise<Project> {
    const result = await this.db
      .insert(projectSchema)
      .values({
        ...data,
        userId,
        status: 'active',
      })
      .returning();

    if (!result[0]) {
      throw new Error('Failed to update project');
    }
    return { ...result[0], status: result[0].status as ProjectStatus };
  }

  async update(id: number, userId: string, data: UpdateProjectDTO): Promise<Project | undefined> {
    const result = await this.db
      .update(projectSchema)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(and(eq(projectSchema.id, id), eq(projectSchema.userId, userId)))
      .returning();

    return result[0] ? { ...result[0], status: result[0].status as ProjectStatus } : undefined;
  }

  async delete(id: number, userId: string): Promise<boolean> {
    const result = await this.db
      .delete(projectSchema)
      .where(and(eq(projectSchema.id, id), eq(projectSchema.userId, userId)))
      .returning();

    return result.length > 0;
  }
}
