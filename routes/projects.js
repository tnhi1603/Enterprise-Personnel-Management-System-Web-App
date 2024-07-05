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
        SELECT Project.ProjectID, Project.ProjectName, Project.StartDay, Project.EndDay, Project.Progress, Project.ProjectName, Project.DepartmentID, Project.StaffID 
        FROM project
        LEFT JOIN 
        Department ON Project.DepartmentID = Department.DepartmentID
        WHERE ProjectID = ?;
    `;

    db.query(query, [projectId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Project not found');
        res.json(results[0]);
    });
});

router.put('update/:id', async (req, res) => {
  try {
    const project = await project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
