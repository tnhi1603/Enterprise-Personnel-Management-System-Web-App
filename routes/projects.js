const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../db');

// GET all projects
router.get('/', (req, res) => {
  const sql = 'SELECT ProjectID, ProjectName, Progress, StartDay, EndDay FROM Project';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
