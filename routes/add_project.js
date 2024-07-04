const express = require('express');
const router = express.Router();
const db = require('../db');

// Thêm dự án mới
router.post('/add', (req, res) => {
  const { ProjectID, ProjectName, DepartmentID, StaffID, StartDay, EndDay } = req.body;

  // Check if ProjectID already exists
  const checkSql = 'SELECT COUNT(*) as count FROM Project WHERE ProjectID = ?';
  db.query(checkSql, [ProjectID], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results[0].count > 0) {
      return res.status(400).json({ error: 'Project ID already exists' });
    }

    // Insert new project into database
    const insertSql = `
      INSERT INTO Project (ProjectID, ProjectName, DepartmentID, StaffID, StartDay, EndDay)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(insertSql, [ProjectID, ProjectName, DepartmentID, StaffID, StartDay, EndDay], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ message: 'Project added successfully' });
    });
  });
});

module.exports = router;
