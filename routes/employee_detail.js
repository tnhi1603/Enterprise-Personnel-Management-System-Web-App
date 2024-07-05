const express = require('express');
const router = express.Router();
const db = require('../db');

// Get employee details by ID
router.get('/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = 'SELECT * FROM Staff WHERE StaffID = ?';
  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// Update employee details by ID
router.put('/:id', (req, res) => {
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
