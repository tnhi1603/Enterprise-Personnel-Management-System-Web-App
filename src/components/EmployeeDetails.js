import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
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
    ReminderID: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/api/employee_detail/${employeeId}`)
      .then(response => {
        setEmployee(response.data);
        setFormData({
          StaffName: response.data.StaffName,
          PhoneNumber: response.data.PhoneNumber,
          DayOfBirth: response.data.DayOfBirth.split('T')[0], // Assuming the date is in ISO format
          DepartmentID: response.data.DepartmentID,
          ProjectID: response.data.ProjectID,
          ReminderID: response.data.ReminderID
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
      StaffName: employee.StaffName,
      PhoneNumber: employee.PhoneNumber,
      DayOfBirth: employee.DayOfBirth.split('T')[0], // Assuming the date is in ISO format
      DepartmentID: employee.DepartmentID,
      ProjectID: employee.ProjectID,
      ReminderID: employee.ReminderID
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/api/employee_detail/${employeeId}`, formData)
      .then(response => {
        setEmployee(response.data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('There was an error updating the employee data!', error);
      });
  };

  return (
    <div className={styles.employeeDetailPage}>
      <Header />
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
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <div>
                <p><strong>Name:</strong> {employee.StaffName}</p>
                <p><strong>Phone Number:</strong> {employee.PhoneNumber}</p>
                <p><strong>Day Of Birth:</strong> {employee.DayOfBirth.split('T')[0]}</p>
                <p><strong>Department ID:</strong> {employee.DepartmentID}</p>
                <p><strong>Project ID:</strong> {employee.ProjectID}</p>
                <p><strong>Reminder ID:</strong> {employee.ReminderID}</p>
                <button onClick={handleEdit}>Edit</button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading employee details...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EmployeeDetail;
