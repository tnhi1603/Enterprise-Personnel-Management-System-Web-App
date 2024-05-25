import React from 'react';
import './ProjectCard.css'; // Import CSS for project card-specific styles

function ProjectCard({ project }) {
  return (
    <div className={`project-card ${project.color}`}>
      <h3>{project.name}</h3>
      <p>{project.department}</p>
      <div className="progress-circle">
        <span>{project.progress}%</span>
      </div>
      <button>More</button>
    </div>
  );
}

export default ProjectCard;
