import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './Project.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <Header />
      <div className="project-container">
        <div className="project-title">
          <h2>Danh sách dự án</h2>
          <Link to="/add_project" className="add-project-button">
            Thêm Dự Án
          </Link>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Project;
