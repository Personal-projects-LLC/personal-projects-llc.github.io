import { getProjects } from './actions';
import { ProjectsClient } from './projects-client';

export default async function ProjectsPage() {
  const initialProjects = await getProjects();

  return <ProjectsClient initialProjects={initialProjects} />;
}
