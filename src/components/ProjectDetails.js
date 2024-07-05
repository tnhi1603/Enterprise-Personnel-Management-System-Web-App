import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the project details!', error);
      });
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    // Send a PUT request to update the project details
    try {
      const response = await axios.put(`http://localhost:3001/api/projects/${id}`, project);
      if (response.status === 200) {
        alert('Project updated successfully');
        navigate('/project');
      } else {
        alert('Failed to update project');
      }
    } catch (error) {
      console.error('There was an error updating the project!', error);
      alert('There was an error updating the project');
    }
  };

  if (!project) return <div>Loading...</div>;

  return (
      <div className="project-details-container">
        <h2>Project Details</h2>
        <form onSubmit={handleEdit}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={project.ProjectName}
              onChange={(e) => setProject({ ...project, ProjectName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="departmentID">Department ID</label>
            <input
              type="number"
              id="departmentID"
              value={project.DepartmentID}
              onChange={(e) => setProject({ ...project, DepartmentID: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="staffID">Staff ID</label>
            <input
              type="number"
              id="staffID"
              value={project.StaffID}
              onChange={(e) => setProject({ ...project, StaffID: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="datetime-local"
              id="startDate"
              value={project.StartDay.replace(' ', 'T')}
              onChange={(e) => setProject({ ...project, StartDay: e.target.value.replace('T', ' ') })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="datetime-local"
              id="endDate"
              value={project.EndDay.replace(' ', 'T')}
              onChange={(e) => setProject({ ...project, EndDay: e.target.value.replace('T', ' ') })}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
  );
};

export default ProjectDetails;
