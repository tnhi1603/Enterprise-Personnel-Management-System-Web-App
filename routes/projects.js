const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../db');

// GET all projects, categorized as active or expired
router.get('/', (req, res) => {
  const currentDateTime = new Date();

  // console.log('Current Date and Time:', currentDateTime);

  const sql = `
    SELECT ProjectID, ProjectName, Progress, StartDay, EndDay 
    FROM Project
    ORDER BY 
      CASE 
        WHEN EndDay < ? THEN 1 
        ELSE 0 
      END, EndDay DESC
  `;

  db.query(sql, [currentDateTime], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: err.message });
    }

    const expiredProjects = results.filter(project => new Date(project.EndDay) < currentDateTime);
    const activeProjects = results.filter(project => new Date(project.EndDay) >= currentDateTime);

    // console.log('Active Projects:', activeProjects); // Log active projects
    // console.log('Expired Projects:', expiredProjects); // Log expired projects

    res.status(200).json({ activeProjects, expiredProjects });
  });
});

router.get('/:id', (req, res) => {
  const projectId = req.params.id;
    const query = `
        SELECT Project.ProjectID, Project.ProjectName, Project.StartDay, Project.EndDay, Project.Progress, Project.ProjectName, Project.DepartmentID, Project.StaffID, Department.Department, Staff.StaffName 
        FROM Project
        LEFT JOIN 
        Department ON Project.DepartmentID = Department.DepartmentID
        LEFT JOIN 
        Staff ON Project.StaffID = Staff.StaffID
        WHERE Project.ProjectID = ?;
    `;

    db.query(query, [projectId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Project not found');
        res.json(results[0]);
    });
});

router.put('/update/:id', (req, res) => {
  const projectId = req.params.id;
  const { ProjectName, Progress, StartDay, EndDay, DepartmentID } = req.body;

  const query = `
    UPDATE Project 
    SET ProjectName = ?, Progress = ?, StartDay = ?, EndDay = ?, DepartmentID = ?, StaffID = ?
    WHERE ProjectID = ?
  `;

  db.query(query, [ProjectName, Progress, StartDay, EndDay, DepartmentID, projectId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database update error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project updated successfully', projectId, ProjectName, Progress, StartDay, EndDay, DepartmentID });
  });
});


module.exports = router;
