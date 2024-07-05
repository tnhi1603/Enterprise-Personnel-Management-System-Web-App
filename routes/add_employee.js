const express = require('express');
const router = express.Router();
const db = require('../db');

// Thêm nhân viên mới
router.post('/add', (req, res) => {
  const { username, password, email, phoneNumber, dayOfBirth, department, employeeID, employeeName } = req.body;

  // Kiểm tra nếu các trường bắt buộc không có giá trị
  if (!username || !password || !email || !phoneNumber || !dayOfBirth || !department || !employeeID || !employeeName) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  // Insert new employee into database
  const insertSql = `
    INSERT INTO Employee (LoginUsername, LoginPassword, Email, PhoneNumber, DayOfBirth, Department, EmployeeID, EmployeeName)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(insertSql, [username, password, email, phoneNumber, dayOfBirth, department, employeeID, employeeName], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Employee added successfully' });
  });
});

module.exports = router;
