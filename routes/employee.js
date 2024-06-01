// routes/employees.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../db');

// Route to get all employees
router.get('/', (req, res) => {
    const query = 'SELECT StaffID, StaffName FROM Staff';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

module.exports = router;
