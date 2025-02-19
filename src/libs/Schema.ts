import { ProjectStatus } from '@/types/Project';
import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.ACTIVE),
});

export { createProjectSchema };
