'use client';

import type { ProjectListProps } from '@/types/Project';

export const ProjectList = ({ projects }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map(({ id, name, description, status }) => (
        <div key={id} className="border rounded p-4">
          <h3 className="font-bold">{name}</h3>
          {description && <p className="mt-2">{description}</p>}
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-sm rounded bg-gray-100">
              {status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
