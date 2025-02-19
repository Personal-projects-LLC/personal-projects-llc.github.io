'use client';

import type { Project, ProjectsClientProps } from '@/types/Project';
import CreateProjectModal from '@/components/projects/CreateProjectModal';
import ProjectList from '@/components/projects/ProjectList';
import { useState } from 'react';
import { createProject } from './actions';

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleCreateProject = async (data: { name: string; description: string }) => {
    try {
      const newProject = await createProject(data);
      setProjects(prev => [...prev, newProject]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
      // TODO: Add error notification
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Project
        </button>
      </div>

      <ProjectList projects={projects} />

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onCloseAction={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </main>
  );
}
