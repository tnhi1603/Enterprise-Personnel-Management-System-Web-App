const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all requests
router.get('/', (req, res) => {
  const query = 'SELECT * FROM Request';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get a specific request by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Request WHERE requestID = ?';
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Request not found');
    res.json(results[0]);
  });
});

// Update request status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE Request SET RequestState = ? WHERE requestID = ?';
  db.query(query, [status, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

module.exports = router;
