const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to add a new employee with full details
router.post('/add', (req, res) => {
  const {
    msnv,
    hoTen,
    ngaySinh,
    cccd,
    phongBan,
    gender,
    position,
    birthplace,
    nationality,
    nation,
    languages,
    currentAddress,
    dateOfJoining,
    email,
    phoneNumber,
    username,
    password
  } = req.body;

  const insertEmployeeQuery = `
    INSERT INTO Staff (StaffID, StaffName, DayOfBirth, PhoneNumber, Email, DepartmentID)
    VALUES (?, ?, ?, ?, ?, ?)`;

  const insertStaffInfoQuery = `
    INSERT INTO StaffInfo (StaffID, Gender, CCCD, Position, Birthplace, Nationality, Nation, Languages, CurrentAddress, DateOfJoining)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const insertLoginQuery = `
    INSERT INTO Login (StaffID, username, password)
    VALUES (?, ?, ?)`;

  db.query(insertEmployeeQuery, [msnv, hoTen, ngaySinh, phoneNumber, email, phongBan], (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    db.query(insertStaffInfoQuery, [msnv, gender, cccd, position, birthplace, nationality, nation, languages, currentAddress, dateOfJoining], (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      db.query(insertLoginQuery, [msnv, username, password], (err) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).send('Employee added successfully');
      });
    });
  });
});

module.exports = router;
