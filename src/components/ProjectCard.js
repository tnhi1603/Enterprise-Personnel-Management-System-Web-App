import React from 'react';
import './ProjectCard.css'; // Import CSS for project card-specific styles

function ProjectCard({ project }) {
  return (
    <div className={"project-card"}>
      <h3>{project.ProjectName}</h3>
      <div className="progress-circle">
        <span>{project.Progress}%</span>
      </div>
      <button>More</button>
    </div>
  );
}

export default ProjectCard;
