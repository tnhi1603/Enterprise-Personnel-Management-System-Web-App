const express = require('express');
const router = express.Router();
const db = require('../db');

// Thêm dự án mới
router.post('/add', (req, res) => {
  const { ProjectName, DepartmentID, StaffID, StartDate, EndDate } = req.body;

  // Kiểm tra nếu các trường bắt buộc không có giá trị
  if (!ProjectName || !DepartmentID || !StaffID || !StartDate || !EndDate) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  // Chuyển đổi ngày tháng từ string sang định dạng MySQL DATETIME
  const formattedStartDate = new Date(StartDate).toISOString().slice(0, 19).replace('T', ' ');
  const formattedEndDate = new Date(EndDate).toISOString().slice(0, 19).replace('T', ' ');

  // Insert new project into database
  const insertSql = `
    INSERT INTO Project (ProjectName, DepartmentID, StaffID, StartDay, EndDay, Progress)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(insertSql, [ProjectName, DepartmentID, StaffID, formattedStartDate, formattedEndDate, 0], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Project added successfully' });
  });
});

module.exports = router;
