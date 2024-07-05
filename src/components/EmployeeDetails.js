import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './EmployeeDetails.css';

function EmployeeDetail() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    StaffName: '',
    PhoneNumber: '',
    DayOfBirth: '',
    DepartmentID: '',
    ProjectID: '',
    ReminderID: '',
    Gender: '',
    CCCD: '',
    Position: '',
    Birthplace: '',
    Nationality: '',
    Nation: '',
    Languages: '',
    CurrentAddress: '',
    DateOfJoining: '',
    Email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/employee/${employeeId}`)
      .then(response => {
        setEmployee(response.data);
        setFormData({
          StaffName: response.data.EmployeeName,
          PhoneNumber: response.data.PhoneNumber,
          DayOfBirth: response.data.DayOfBirth.split('T')[0], // Assuming the date is in ISO format
          DepartmentID: response.data.DepartmentID,
          ProjectID: response.data.ProjectID,
          ReminderID: response.data.ReminderID,
          Gender: response.data.Gender,
          CCCD: response.data.CCCD,
          Position: response.data.Position,
          Birthplace: response.data.Birthplace,
          Nationality: response.data.Nationality,
          Nation: response.data.Nation,
          Languages: response.data.Languages,
          CurrentAddress: response.data.CurrentAddress,
          DateOfJoining: response.data.DateOfJoining.split('T')[0], // Assuming the date is in ISO format
          Email: response.data.Email,
          username: response.data.username,
          password: response.data.password
        });
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, [employeeId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      StaffName: employee.EmployeeName,
      PhoneNumber: employee.PhoneNumber,
      DayOfBirth: employee.DayOfBirth.split('T')[0], // Assuming the date is in ISO format
      DepartmentID: employee.DepartmentID,
      ProjectID: employee.ProjectID,
      ReminderID: employee.ReminderID,
      Gender: employee.Gender,
      CCCD: employee.CCCD,
      Position: employee.Position,
      Birthplace: employee.Birthplace,
      Nationality: employee.Nationality,
      Nation: employee.Nation,
      Languages: employee.Languages,
      CurrentAddress: employee.CurrentAddress,
      DateOfJoining: employee.DateOfJoining.split('T')[0], // Assuming the date is in ISO format
      Email: employee.Email,
      username: employee.username,
      password: employee.password
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/api/employee/update/${employeeId}`, formData)
      .then(response => {
        alert('Employee details updated successfully');
        setEmployee(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('There was an error updating the employee data!', error);
      });
  };

  return (
    <div className={styles.employeeDetailContainer}>
      {employee ? (
        <div>
          <h2>Employee Details</h2>
          {isEditing ? (
            <div>
              <label>
                Staff Name:
                <input
                  type="text"
                  name="StaffName"
                  value={formData.StaffName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Day Of Birth:
                <input
                  type="date"
                  name="DayOfBirth"
                  value={formData.DayOfBirth}
                  onChange={handleChange}
                />
              </label>
              <label>
                Department ID:
                <input
                  type="text"
                  name="DepartmentID"
                  value={formData.DepartmentID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Project ID:
                <input
                  type="text"
                  name="ProjectID"
                  value={formData.ProjectID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Reminder ID:
                <input
                  type="text"
                  name="ReminderID"
                  value={formData.ReminderID}
                  onChange={handleChange}
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                />
              </label>
              <label>
                CCCD:
                <input
                  type="text"
                  name="CCCD"
                  value={formData.CCCD}
                  onChange={handleChange}
                />
              </label>
              <label>
                Position:
                <input
                  type="text"
                  name="Position"
                  value={formData.Position}
                  onChange={handleChange}
                />
              </label>
              <label>
                Birthplace:
                <input
                  type="text"
                  name="Birthplace"
                  value={formData.Birthplace}
                  onChange={handleChange}
                />
              </label>
              <label>
                Nationality:
                <input
                  type="text"
                  name="Nationality"
                  value={formData.Nationality}
                  onChange={handleChange}
                />
              </label>
              <label>
                Nation:
                <input
                  type="text"
                  name="Nation"
                  value={formData.Nation}
                  onChange={handleChange}
                />
              </label>
              <label>
                Languages:
                <input
                  type="text"
                  name="Languages"
                  value={formData.Languages}
                  onChange={handleChange}
                />
              </label>
              <label>
                Current Address:
                <input
                  type="text"
                  name="CurrentAddress"
                  value={formData.CurrentAddress}
                  onChange={handleChange}
                />
              </label>
              <label>
                Date Of Joining:
                <input
                  type="date"
                  name="DateOfJoining"
                  value={formData.DateOfJoining}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {employee.EmployeeName}</p>
              <p><strong>Gender:</strong> {employee.Gender}</p>
              <p><strong>CCCD:</strong> {employee.CCCD}</p>
              <p><strong>Position:</strong> {employee.Position}</p>
              <p><strong>Birthplace:</strong> {employee.Birthplace}</p>
              <p><strong>Nationality:</strong> {employee.Nationality}</p>
              <p><strong>Nation:</strong> {employee.Nation}</p>
              <p><strong>Languages:</strong> {employee.Languages}</p>
              <p><strong>Current Address:</strong> {employee.CurrentAddress}</p>
              <p><strong>Date Of Joining:</strong> {employee.DateOfJoining.split('T')[0]}</p>
              <p><strong>Email:</strong> {employee.Email}</p>
              <p><strong>Phone Number:</strong> {employee.PhoneNumber}</p>
              <p><strong>Day Of Birth:</strong> {employee.DayOfBirth.split('T')[0]}</p>
              <p><strong>Department:</strong> {employee.Department}</p>
              <p><strong>Project Name:</strong> {employee.ProjectName}</p>
              <p><strong>Username:</strong> {employee.username}</p>
              <p><strong>Password:</strong> {employee.password}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
}

export default EmployeeDetail;
