import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useNavigate } from 'react-router-dom';
import styles from './Employee.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/employee')
      .then(response => {
        const data = Array.isArray(response.data) ? response.data : [];
        setEmployees(data);
      })
      .catch(error => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.DepartmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.ProjectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (employeeId) => {
    navigate(`/employeedetail`);
  };

  return (
    <div className={styles.employeePage}>
      <div className="employeeContainer">
        <div className="employeeTitle">
          <h2>Danh sách nhân viên</h2>
          <Link to="/add_employee" className="addEmployeeButton">
            Thêm Nhân Viên
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search by name, department, or project"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="employeeSearch"
        />
        <table className="employeeTable">
          <thead>
            <tr>
              <th>Tên Nhân Viên</th>
              <th>Phòng Ban</th>
              <th>Dự Án</th>
            </tr>
          </thead>
          <tbody>
          {filteredEmployees.map(employee => (
              <tr key={employee.EmployeeID} onClick={() => handleRowClick(employee.EmployeeID)}>
                <td>{employee.EmployeeName}</td>
                <td>{employee.Department}</td>
                <td>{employee.ProjectName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
