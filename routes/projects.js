const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../db');

// GET all projects, categorized as active or expired
router.get('/', (req, res) => {
  const currentDateTime = new Date();

  console.log('Current Date and Time:', currentDateTime); // Log current date and time

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

module.exports = router;
