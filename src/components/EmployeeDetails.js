import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    EmployeeName: '',
    Gender: '',
    CCCD: '',
    Position: '',
    Department: '',
    ProjectName: '',
    Birthplace: '',
    Nationality: '',
    Nation: '',
    Email: '',
    username: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/employee/${id}`)
      .then(response => {
        setEmployee(response.data);
        setFormData(response.data);
      })
      .catch(error => console.error('Error fetching employee details:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/api/employee/${id}`, formData)
      .then(response => {
        setEmployee(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error saving employee details:', error));
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>Employee Details</h2>
      {isEditing ? (
        <div>
          <p>Employee ID: {employee.EmployeeID}</p>
          <div>
            <label>Name: </label>
            <input 
              type="text" 
              name="EmployeeName" 
              value={formData.EmployeeName} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Gender: </label>
            <input 
              type="text" 
              name="Gender" 
              value={formData.Gender} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>ID: </label>
            <input 
              type="text" 
              name="CCCD" 
              value={formData.CCCD} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Position: </label>
            <input 
              type="text" 
              name="Position" 
              value={formData.Position} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Department: </label>
            <input 
              type="text" 
              name="Department" 
              value={formData.Department} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Project: </label>
            <input 
              type="text" 
              name="ProjectName" 
              value={formData.ProjectName} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Birthplace: </label>
            <input 
              type="text" 
              name="Birthplace" 
              value={formData.Birthplace} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Nationality: </label>
            <input 
              type="text" 
              name="Nationality" 
              value={formData.Nationality} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Nation: </label>
            <input 
              type="text" 
              name="Nation" 
              value={formData.Nation} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Email: </label>
            <input 
              type="email" 
              name="Email" 
              value={formData.Email} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label>Username: </label>
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleInputChange} 
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Employee ID: {employee.EmployeeID}</p>
          <p>Name: {employee.EmployeeName}</p>
          <p>Gender: {employee.Gender}</p>
          <p>ID: {employee.CCCD}</p>
          <p>Position: {employee.Position}</p>
          <p>Department: {employee.Department}</p>
          <p>Project: {employee.ProjectName}</p>
          <p>Birthplace: {employee.Birthplace}</p>
          <p>Nationality: {employee.Nationality}</p>
          <p>Nation: {employee.Nation}</p>
          <p>Email: {employee.Email}</p>
          <p>Username: {employee.username}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetails;
