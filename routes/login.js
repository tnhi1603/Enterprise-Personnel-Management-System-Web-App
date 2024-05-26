const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;  // Load secret key from environment variable

// Registration route
router.post('/register', async (req, res) => {
    const { staffID, username, password } = req.body;

    // Check if username already exists
    db.query('SELECT * FROM Login WHERE Username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Error checking username:', err.stack);
            return res.status(500).send('Error checking username');
        }
        if (results.length > 0) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into Login table
        db.query('INSERT INTO Login (StaffID, Username, Password) VALUES (?, ?, ?)', 
            [staffID, username, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error registering user:', err.stack);
                return res.status(500).send('Error registering user');
            }
            res.status(201).send('User registered successfully');
        });
    });
});

// Login route
router.post('/login', (req, res) => {
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

        // Generate JWT token
        const token = jwt.sign({ id: user.LoginID, staffID: user.StaffID }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    });
});

module.exports = router;
