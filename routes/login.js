const express = require('express');
const router = express.Router();
const db = require('../db');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST login
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM login WHERE Username = ?';
  
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = results[0];

    // Check password
    if (password !== user.Password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.LoginID }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  });
});

module.exports = router;
