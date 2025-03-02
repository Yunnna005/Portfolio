import TagList from "./TagList";
import ImageGallery from "./ImageGallery";
import { Project } from "./Projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          ×
        </button>
        <h3>{project.name}</h3>

        <ImageGallery images={project.images} name={project.name} />

        <div className="modal-details">
          <p>{project.detailedInfo}</p>
          <TagList tags={project.tags} />
          <a
            href={project.link}
            className="project-link modal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Project
          </a>
        </div>
      </div>
    </div>
  );
}
