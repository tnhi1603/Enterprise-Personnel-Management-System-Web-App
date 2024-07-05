import React from 'react';
import './ProjectCard.css'; 
import { Link } from 'react-router-dom';

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
      <Link to={`/project/${project.ProjectID}`}>
        <button>More</button>
      </Link>
    </div>
  );
}

export default ProjectCard;
