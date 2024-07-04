const express = require('express');
const router = express.Router();
const db = require('../db');

// Thêm dự án mới
router.post('/add', (req, res) => {
  const { ProjectName, DepartmentID, StaffID, StartDate, EndDate } = req.body;

  // Chuyển đổi ngày tháng từ format yyyy-mm-dd sang định dạng MySQL DATE
  const formattedStartDate = new Date(StartDate).toISOString().slice(0, 10);
  const formattedEndDate = new Date(EndDate).toISOString().slice(0, 10);

  // Insert new project into database
  const insertSql = `
    INSERT INTO Project (ProjectName, DepartmentID, StaffID, StartDay, EndDay)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(insertSql, [ProjectName, DepartmentID, StaffID, formattedStartDate, formattedEndDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Project added successfully' });
  });
});

module.exports = router;
