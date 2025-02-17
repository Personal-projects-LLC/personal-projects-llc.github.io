// import AuthDebug from '@/components/AuthDebug';
import ProjectList from '@/components/projects/ProjectList';
import { getProjects } from './actions';

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {/* <AuthDebug /> */}
      <div className="mt-4">
        <ProjectList projects={projects} />
      </div>
    </main>
  );
};

export default ProjectsPage;
