const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to get all employee information
router.get('/', (req, res) => {
    const query = `
        SELECT 
            Staff.StaffID AS EmployeeID,
            Staff.StaffName AS EmployeeName,
            Department.Department,
            Project.ProjectName
        FROM 
            Staff
        LEFT JOIN 
            Department ON Staff.DepartmentID = Department.DepartmentID
        LEFT JOIN 
            Project ON Staff.ProjectID = Project.ProjectID;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get employee details by ID
router.get('/:id', (req, res) => {
    const employeeId = req.params.id;
    const query = `
      SELECT 
          Staff.StaffID AS EmployeeID,
          Staff.StaffName AS EmployeeName,
          StaffInfo.Gender,
          StaffInfo.CCCD,
          StaffInfo.Position,
          StaffInfo.Birthplace,
          StaffInfo.Nationality,
          StaffInfo.Nation,
          StaffInfo.Languages,
          StaffInfo.CurrentAddress,
          StaffInfo.DateOfJoining,
          Staff.Email,
          Staff.PhoneNumber,
          Staff.DayOfBirth,
          Department.Department,
          Project.ProjectName
      FROM 
          Staff
      LEFT JOIN 
          StaffInfo ON Staff.StaffID = StaffInfo.StaffID
      LEFT JOIN 
          Department ON Staff.DepartmentID = Department.DepartmentID
      LEFT JOIN 
          Project ON Staff.ProjectID = Project.ProjectID
      WHERE 
          Staff.StaffID = ?;
    `;
    db.query(query, [employeeId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send(err);
      }
      res.json(results[0]);
    });
  });
  
  // Update employee details by ID
  router.put('/update/:id', (req, res) => {
    const employeeId = req.params.id;
    const { StaffName, PhoneNumber, DayOfBirth, DepartmentID, ProjectID, ReminderID } = req.body;
    const query = 'UPDATE Staff SET StaffName = ?, PhoneNumber = ?, DayOfBirth = ?, DepartmentID = ?, ProjectID = ?, ReminderID = ? WHERE StaffID = ?';
    db.query(query, [StaffName, PhoneNumber, DayOfBirth, DepartmentID, ProjectID, ReminderID, employeeId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).send(err);
      }
      res.json({ StaffID: employeeId, StaffName, PhoneNumber, DayOfBirth, DepartmentID, ProjectID, ReminderID });
    });
  });

module.exports = router;
