import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './Project.css'; 
import axios from 'axios';

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
    <div className="page">
    <div><Header /></div>
    <div className="project">
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
    <div><Footer /></div>
    </div>
  );
}

export default Project;
