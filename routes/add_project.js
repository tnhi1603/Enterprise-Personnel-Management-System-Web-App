const express = require('express');
const router = express.Router();
const db = require('../db');

// Thêm dự án mới
router.post('/add', (req, res) => {
  const { ProjectName, DepartmentID, StaffID, StartDate, EndDate } = req.body;

  // Kiểm tra và chuyển đổi kiểu dữ liệu
  const departmentID = parseInt(DepartmentID, 10);
  const staffID = parseInt(StaffID, 10);

  // Chuyển đổi định dạng ngày tháng từ dd/mm/yyyy sang yyyy-mm-dd hh:mm:ss
  const formattedStartDate = startDate.split('/').reverse().join('-') + ' 00:00:00';
  const formattedEndDate = endDate.split('/').reverse().join('-') + ' 00:00:00';
  // Insert new project into database
  const insertSql = `
    INSERT INTO Project (ProjectName, DepartmentID, StaffID, StartDay, EndDay)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(insertSql, [ProjectName, departmentID, staffID, formattedStartDate, formattedEndDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Project added successfully' });
  });
});

module.exports = router;
