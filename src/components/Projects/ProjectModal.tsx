import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Project } from './Projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        
        <div className="project-images">
          {project.images.map((image, index) => (
            <img key={index} src={image} alt={`${project.name} ${index + 1}`} />
          ))}
        </div>
        
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
        
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

        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;

