'use server';

import type { Project } from '@/types/Project';
import { ProjectRepository } from '@/repositories/ProjectRepository';
import { ProjectService } from '@/services/ProjectService';
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
