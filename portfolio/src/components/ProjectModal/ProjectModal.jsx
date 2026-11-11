import React from "react";
import "./ProjectModal.css";

const ProjectModal = ({ project, onClose }) => {
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	// Champs optionnels : ils n'apparaissent que si ils sont renseignes dans projects.js
	const meta = [
		["Team", project.team],
		["Role", project.role],
		["What I learned", project.learned],
	].filter(([, v]) => v);

	return (
		<div className="modal-overlay" onClick={handleOverlayClick} onKeyDown={(e) => e.key === "Escape" && onClose()} role="dialog" aria-modal="true" aria-labelledby={`project-title-${project.id}`}>
			<div className="modal project-modal" tabIndex={-1}>
				<button className="modal-close" onClick={onClose} aria-label="Close project details">
					✕
				</button>

				<div className="modal-content">
					<div className="project-header">
						<h2 id={`project-title-${project.id}`} className="project-title">
							{project.name}
						</h2>
						<div className="project-tags">
							{project.tags?.map((tag) => (
								<span key={tag} className="tag">
									{tag}
								</span>
							))}
						</div>
					</div>

					{project.image && (
						<div className="project-image-container">
							<img src={project.image} alt={`Screenshot of ${project.name}`} className="project-image" />
						</div>
					)}

					<div className="project-description">
						<p>{project.description}</p>
					</div>

					{meta.length > 0 && (
						<dl className="project-meta">
							{meta.map(([k, v]) => (
								<div key={k}>
									<dt>{k}</dt>
									<dd>{v}</dd>
								</div>
							))}
						</dl>
					)}

					<div className="project-link-container">
						{project.demo && (
							<a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
								Live demo <span className="link-icon">↗</span>
							</a>
						)}{" "}
						<a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
							{project.demo ? "Source" : "View Project"} <span className="link-icon">↗</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectModal;
