const express = require('express');
const router = express.Router();
const db = require('../db');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const SECRET_KEY = 'a3d9f85a7e9b1c23984f8e237a6df8b7e39a6d87e4a5c6d78b39a6e57c3d7a4b';

// Login route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM auth WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Create a token including the AdminID
    const token = jwt.sign({ AuthID: user.AuthID, AdminID: user.AdminID, username: user.Username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  });
});

// Get user information by AdminID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT auth.AdminID, auth.Username, admin.Email FROM auth LEFT JOIN admin ON auth.AdminID = admin.AdminID WHERE auth.AdminID = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    res.json(user);
  });
});

// Update user information by AdminID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const query1 = 'UPDATE auth SET Username = ? WHERE AdminID = ?';
  const query2 = 'UPDATE admin SET Email = ? WHERE AdminID = ?';

  db.query(query1, [username, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found in auth' });
    }

    db.query(query2, [email, id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Server error', error: err });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found in admin' });
      }

      res.json({ message: 'User information updated successfully' });
    });
  });
});

module.exports = router;
