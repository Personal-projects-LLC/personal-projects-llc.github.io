'use server';

import type { Project } from '@/types/Project';
import { createProjectSchema } from '@/libs/Schema';
import { ProjectRepository } from '@/repositories/ProjectRepository';
import { ProjectService } from '@/services/ProjectService';
import { ProjectStatus } from '@/types/Project';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const projectService = new ProjectService(new ProjectRepository());

export async function getProjects(): Promise<Project[]> {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  try {
    return await projectService.getAllProjects(userId);
  } catch (error) {
    console.error('Failed to get projects:', error);
    throw new Error('Failed to get projects');
  }
}

export async function createProject(data: {
  name: string;
  description?: string;
}): Promise<Project> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  // Валидация входных данных
  const validatedData = createProjectSchema.parse(data);

  try {
    return await projectService.createProject(
      {
        ...validatedData,
        status: ProjectStatus.ACTIVE,
      },
      userId,
    );
  } catch (error) {
    console.error('Failed to create project:', error);
    throw new Error('Failed to create project');
  }
}
