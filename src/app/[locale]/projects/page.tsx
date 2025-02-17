import { ProjectList } from '@/components/projects/ProjectList';
import { getProjects } from './actions/getProjects';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ProjectList projects={projects} />
    </main>
  );
}
