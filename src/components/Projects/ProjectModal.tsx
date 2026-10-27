import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Project } from './Projects';
import TagList from './TagList';
import { hasRealLink } from './projectLinks';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on open, close on Escape, and hand focus back to
  // the project row that opened the window
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-modal-header">
          <h2 id="project-modal-title">{project.name}</h2>
          <button ref={closeButtonRef} className="close-button" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <p className="project-description">{project.description}</p>

        <div className="project-images">
          {project.images.map((image, index) => (
            <img key={index} src={image} alt={`${project.name} ${index + 1}`} />
          ))}
        </div>

        <TagList tags={project.tags} />

        <div className="project-detailed-info">
          {/* Use ReactMarkdown to render the detailed content */}
          {project.markdownContent ? (
            <ReactMarkdown>
              {/* Extract only the Detailed Info section */}
              {project.markdownContent.split('## Detailed Info')[1] || project.detailedInfo}
            </ReactMarkdown>
          ) : (
            <p>{project.detailedInfo}</p>
          )}
        </div>

        {hasRealLink(project.link) && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="button-primary">
            View project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
