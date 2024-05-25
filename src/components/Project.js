import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard.js';
import Header from './Header.js';
import './Project.css'; 
import './Header.css';
import axios from 'axios';

// const projects = [
//   { name: 'ProjectName', department: 'Department', progress: 50, color: 'red' },
//   { name: 'ProjectName', department: 'Department', progress: 75, color: 'green' },
//   { name: 'ProjectName', department: 'Department', progress: 50, color: 'orange' },
//   { name: 'ProjectName', department: 'Department', progress: 50, color: 'orange' },
//   { name: 'ProjectName', department: 'Department', progress: 50, color: 'orange' },
//   { name: 'ProjectName', department: 'Department', progress: 50, color: 'orange' }
// ];

function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
      });
  }, []);

  return (
    <div className="project">
      <div className="header">
      <Header />
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Project;
