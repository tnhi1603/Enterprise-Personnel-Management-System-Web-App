import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/employee/${id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee details!', error);
      });
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{employee.EmployeeName}</h1>
      <p><strong>Department:</strong> {employee.DepartmentName}</p>
      <p><strong>Project:</strong> {employee.ProjectName}</p>
      <p><strong>Email:</strong> {employee.Email}</p>
      <p><strong>Phone:</strong> {employee.Phone}</p>
      <p><strong>Address:</strong> {employee.Address}</p>
      {/* Add more fields as necessary */}
    </div>
  );
}

export default EmployeeDetails;
