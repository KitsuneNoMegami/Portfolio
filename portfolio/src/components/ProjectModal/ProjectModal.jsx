import React from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="modal project-modal" tabIndex={-1}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ✕
        </button>

        <div className="modal-content">
          <div className="project-header">
            <h2 id={`project-title-${project.id}`} className="project-title">
              {project.name}
            </h2>
            <div className="project-tags">
              {project.tags?.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {project.image && (
            <div className="project-image-container">
              <img
                src={project.image}
                alt={`Screenshot of ${project.name}`}
                className="project-image"
              />
            </div>
          )}

          <div className="project-description">
            <p>{project.description}</p>
          </div>

          <div className="project-link-container">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Project
              <span className="link-icon">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;