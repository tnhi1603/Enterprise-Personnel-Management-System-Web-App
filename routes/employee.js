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

router.get('/:id', (req, res) => {
  const StaffID = req.params.id;
  
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
      Project.ProjectName,
      Login.username,
      Login.password
    FROM Staff
    LEFT JOIN StaffInfo ON Staff.StaffID = StaffInfo.StaffID
    LEFT JOIN Department ON Staff.DepartmentID = Department.DepartmentID
    LEFT JOIN Project ON Staff.ProjectID = Project.ProjectID
    LEFT JOIN Login ON Staff.StaffID = Login.StaffID
    WHERE Staff.StaffID = ?`;

  db.query(query, [StaffID], (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else if (results.length === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Endpoint to update employee details
router.put('/update/:id', (req, res) => {
  const employeeId = req.params.id;
  const {
    StaffName,
    PhoneNumber,
    DayOfBirth,
    DepartmentID,
    ProjectID,
    ReminderID,
    Gender,
    CCCD,
    Position,
    Birthplace,
    Nationality,
    Nation,
    Languages,
    CurrentAddress,
    DateOfJoining,
    Email,
    username,
    password
  } = req.body;

  const updateEmployeeQuery = `
    UPDATE Staff 
    SET StaffName = ?, PhoneNumber = ?, DayOfBirth = ?, DepartmentID = ?, ProjectID = ?, ReminderID = ?, Email = ?
    WHERE StaffID = ?`;

  const updateStaffInfoQuery = `
    UPDATE StaffInfo 
    SET Gender = ?, CCCD = ?, Position = ?, Birthplace = ?, Nationality = ?, Nation = ?, Languages = ?, CurrentAddress = ?, DateOfJoining = ?
    WHERE StaffID = ?`;

  const updateLoginQuery = `
    UPDATE Login 
    SET username = ?, password = ?
    WHERE StaffID = ?`;

  db.query(updateEmployeeQuery, [StaffName, PhoneNumber, DayOfBirth, DepartmentID, ProjectID, ReminderID, Email, employeeId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    db.query(updateStaffInfoQuery, [Gender, CCCD, Position, Birthplace, Nationality, Nation, Languages, CurrentAddress, DateOfJoining, employeeId], (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      db.query(updateLoginQuery, [username, password, employeeId], (err) => {
        if (err) {
          return res.status(500).send(err);
        }

        // Fetch updated data to return as response
        const fetchUpdatedEmployeeQuery = `
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
            Project.ProjectName,
            Login.username,
            Login.password
          FROM Staff
          LEFT JOIN StaffInfo ON Staff.StaffID = StaffInfo.StaffID
          LEFT JOIN Department ON Staff.DepartmentID = Department.DepartmentID
          LEFT JOIN Project ON Staff.ProjectID = Project.ProjectID
          LEFT JOIN Login ON Staff.StaffID = Login.StaffID
          WHERE Staff.StaffID = ?`;

        db.query(fetchUpdatedEmployeeQuery, [employeeId], (err, results) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.status(200).json(results[0]);
        });
      });
    });
  });
});


module.exports = router;
