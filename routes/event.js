const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const query = `
        SELECT EventID, EventName, EventDate FROM events;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const eventId = req.params.id;
    const query = `
        SELECT EventName, EventDate, EventContent 
        FROM events
        WHERE EventID = ?;
    `;

    db.query(query, [eventId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Event not found');
        res.json(results[0]);
    });
});

router.put('/add/:id', (req, res) => {
    const { id } = req.params;
    const { EventName, EventDate, EventContent } = req.body;

    const query = `
        UPDATE events
        SET EventName = ?, EventDate = ?, EventContent = ?
        WHERE EventID = ?;
    `;

    db.query(query, [EventName, EventDate, EventContent, id], (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.affectedRows === 0) {
            return res.status(404).send('Event not found');
        }

        res.json({ message: 'Event updated successfully' });
    });
});
module.exports = router;
