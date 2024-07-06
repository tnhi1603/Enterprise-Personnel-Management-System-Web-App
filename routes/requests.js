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

// Update request status
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE Request SET RequestState = ? WHERE id = ?';
    db.query(query, [status, id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;
