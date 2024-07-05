import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './Project.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

function Project() {
  const [activeProjects, setActiveProjects] = useState([]);
  const [expiredProjects, setExpiredProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/projects')
      .then(response => {
        // console.log('Fetched Projects:', response.data);
        if (response.data && Array.isArray(response.data.activeProjects) && Array.isArray(response.data.expiredProjects)) {
          setActiveProjects(response.data.activeProjects);
          setExpiredProjects(response.data.expiredProjects);
        } else {
          console.error('Invalid response format', response.data);
        }
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
          <h4>Danh sách dự án</h4>
          <Link to="/add_project" className="add-project-button">
            Thêm Dự Án
          </Link>
        </div>
        <div className="project-section">
          <h4>Dự Án Hiện Tại</h4>
          <div className="project-list">
            {activeProjects.map((project) => (
              <ProjectCard key={project.ProjectID} project={project} />
            ))}
          </div>
        </div>
        <div className="project-section">
          <h4>Dự Án Hết Hạn</h4>
          <div className="project-list">
            {expiredProjects.map((project) => (
              <ProjectCard key={project.ProjectID} project={project} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Project;
