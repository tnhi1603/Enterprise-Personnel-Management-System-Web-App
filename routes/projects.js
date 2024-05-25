const express = require('express');
const mysql = require('mysql');
const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dbweb'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// GET all projects
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM projects';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
