import React from "react";
import "./ProjectCard.css";

function ProjectCard({ title, description, image }) {
  return (
    <div className="project-card">
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
