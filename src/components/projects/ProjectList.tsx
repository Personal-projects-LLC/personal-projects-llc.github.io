'use client';

import type { ProjectListProps } from '@/types/Project';

const ProjectList = ({ projects }: ProjectListProps) => {
  if (!projects?.length) {
    return (
      <div className="text-center py-4">
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map(({ id, name, description, status, createdAt, updatedAt }) => (
        <div key={id} className="border rounded p-4">
          <h3 className="font-bold">{name}</h3>
          {description && <p className="mt-2">{description}</p>}
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-sm rounded bg-gray-100">
              {status}
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                Created:
                {new Date(createdAt).toLocaleDateString()}
              </span>
              <span>
                Updated:
                {new Date(updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
