const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

// Login route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  db.query('SELECT * FROM Login WHERE Username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err.stack);
      return res.status(500).send('Error fetching user');
    }
    if (results.length === 0) {
      return res.status(401).send('Invalid username or password');
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }
  });
});

module.exports = router;
