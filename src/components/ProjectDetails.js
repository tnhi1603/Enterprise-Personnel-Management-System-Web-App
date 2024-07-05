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

    const updatedProject = {
      ProjectName: project.ProjectName,
      Progress: project.Progress,
      StartDay: project.StartDay,
      EndDay: project.EndDay,
      DepartmentID: project.DepartmentID,
      StaffID: project.StaffID
    };

    // Send a PUT request to update the project details
    try {
      const response = await axios.put(`http://localhost:3001/api/projects/update/${id}`, updatedProject);
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

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
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
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            value={project.Department}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="staffID">Leader ID</label>
          <input
            type="number"
            id="staffID"
            value={project.StaffID}
            onChange={(e) => setProject({ ...project, StaffID: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="staffName">Leader</label>
          <input
            type="text"
            id="staffName"
            value={project.StaffName}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="datetime-local"
            id="startDate"
            value={formatDateTime(project.StartDay)}
            onChange={(e) => setProject({ ...project, StartDay: e.target.value.replace('T', ' ') })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="datetime-local"
            id="endDate"
            value={formatDateTime(project.EndDay)}
            onChange={(e) => setProject({ ...project, EndDay: e.target.value.replace('T', ' ') })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="progress">Progress</label>
          <input
            type="number"
            id="progress"
            value={project.Progress}
            onChange={(e) => setProject({ ...project, Progress: e.target.value })}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProjectDetails;
