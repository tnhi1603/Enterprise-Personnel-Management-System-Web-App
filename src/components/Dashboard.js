import React from 'react';
import ProjectCard from './ProjectCard.js';
import './Dashboard.css'; // Import CSS for dashboard-specific styles

const projects = [
  { name: 'ProjectName', department: 'Department', progress: 50, color: 'red' },
  { name: 'ProjectName', department: 'Department', progress: 75, color: 'green' },
  { name: 'ProjectName', department: 'Department', progress: 50, color: 'orange' }
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="project-list">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
