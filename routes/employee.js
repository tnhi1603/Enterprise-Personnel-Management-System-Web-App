// routes/employees.js
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

module.exports = router;
