import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from './Employee.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className={styles.employeePage}>
      <Header />
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
              <tr key="EmployeeID">
                <Link to={`/employee/${employee.EmployeeID}`}>
                    {employee.EmployeeName}
                </Link>
                <td>{employee.Department}</td>
                <td>{employee.ProjectName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer className="employeeFooter" />
    </div>
  );
}

export default EmployeeList;
