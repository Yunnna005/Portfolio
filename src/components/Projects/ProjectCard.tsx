import ProjectImage from "./ProjectImage";
import { Project } from "./Projects";
import TagList from "./TagList";

interface ProjectCardProps {
  project: Project;
  openProjectDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  openProjectDetails,
}: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-shape">
        <div className="project-content">
          <h3>{project.name}</h3>

          <ProjectImage
            image={project.images[0]}
            name={project.name}
            hasMultiple={project.images.length > 1}
          />

          <p>{project.description}</p>
          <TagList tags={project.tags} />

          <div className="project-actions">
            <a
              href={project.link}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Project
            </a>
            <button
              className="learn-more-btn"
              onClick={() => openProjectDetails(project)}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
