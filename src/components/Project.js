import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import Header from './Header';
import Footer from './Footer';
import './Project.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

function Project() {
  const [activeProjects, setActiveProjects] = useState([]);
  const [expiredProjects, setExpiredProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/projects')
      .then(response => {
        const fetchedProjects = response.data;

        // Sort projects by creation date in descending order
        fetchedProjects.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));

        // Separate active and expired projects
        const now = new Date();
        const active = [];
        const expired = [];

        fetchedProjects.forEach(project => {
          const endDate = new Date(project.EndDay);
          if (endDate < now) {
            expired.push(project);
          } else {
            active.push(project);
          }
        });

        setActiveProjects(active);
        setExpiredProjects(expired);
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
        <div className="project-list">
          <h5>Dự Án Hiện Tại</h5>
          {activeProjects.map((project) => (
            <ProjectCard key={project.ProjectID} project={project} />
          ))}
        </div>
        <div className="expired-project-list">
          <h5>Dự Án Hết Hạn</h5>
          {expiredProjects.map((project) => (
            <ProjectCard key={project.ProjectID} project={project} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Project;