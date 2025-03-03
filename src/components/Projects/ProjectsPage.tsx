import React from "react";
import ProjectModal from "./ProjectModal";

interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  link: string;
  images: string[];
  detailedInfo: string;
}

interface ProjectsPageProps {
  projects: Project[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  // Sort projects by date in descending order
  const sortedProjects = projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {sortedProjects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Date: {project.date}</p>
            <ProjectModal project={project} onClose={() => {}} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;