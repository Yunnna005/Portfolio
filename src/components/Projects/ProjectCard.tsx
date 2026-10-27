import { Project } from "./Projects";
import TagList from "./TagList";
import { hasRealLink } from "./projectLinks";

interface ProjectCardProps {
  project: Project;
  openProjectDetails: (project: Project) => void;
}

export default function ProjectCard({
  project,
  openProjectDetails,
}: ProjectCardProps) {
  return (
    <li className="project">
      <figure className="project-figure">
        {project.images[0] && (
          <img src={project.images[0]} alt={`${project.name} screenshot`} loading="lazy" />
        )}
        {project.images[1] && (
          <img className="project-figure-alt" src={project.images[1]} alt="" loading="lazy" />
        )}
      </figure>

      <div className="project-text">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-description">{project.description}</p>

        <dl className="spec">
          <div className="spec-row">
            <dt>Year</dt>
            <dd>
              <time dateTime={project.date}>{project.date.slice(0, 4)}</time>
            </dd>
          </div>
          <div className="spec-row">
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div className="spec-row">
            <dt>Stack</dt>
            <dd>
              <TagList tags={project.tags} />
            </dd>
          </div>
        </dl>

        <div className="project-actions">
          <button
            type="button"
            className="text-link"
            aria-haspopup="dialog"
            onClick={() => openProjectDetails(project)}
          >
            Read more
          </button>
          {hasRealLink(project.link) && (
            <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
              View project
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
