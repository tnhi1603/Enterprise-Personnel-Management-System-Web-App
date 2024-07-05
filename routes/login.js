const express = require('express');
const router = express.Router();
const db = require('../db');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const SECRET_KEY = 'a3d9f85a7e9b1c23984f8e237a6df8b7e39a6d87e4a5c6d78b39a6e57c3d7a4b';

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Create a token
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  });
});



module.exports = router;
