'use client';

import type { ProjectCardProps } from '@/types/Project';
import { format } from 'date-fns';

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
          {project.description && (
            <p className="mt-1 text-sm text-gray-500">{project.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(project)}
              className="text-sm text-gray-600 hover:text-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {project.status}
        </span>
        <div className="flex gap-4">
          <span>
            Created:
            {format(new Date(project.createdAt), 'MMM d, yyyy')}
          </span>
          <span>
            Updated:
            {format(new Date(project.updatedAt), 'MMM d, yyyy')}
          </span>
        </div>
      </div>
    </div>
  );
}
