import React from 'react';
import './ProjectCard.css'; // Import CSS for project card-specific styles

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function ProjectCard({ project }) {
  return (
    <div className={"project-card"}>
      <h3>{project.ProjectName}</h3>
      <div className="project-details">
        <div className="progress-circle">
          <span>{project.Progress}%</span>
        </div>
        <div className="date-range">
          <p>Start: {formatDate(project.StartDay)}</p>
          <p>End: {formatDate(project.EndDay)}</p>
        </div>
        </div>
      <button>More</button>
    </div>
  );
}

export default ProjectCard;
