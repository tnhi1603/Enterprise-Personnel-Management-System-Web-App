const express = require('express');
const router = express.Router();
const db = require('../db');
const moment = require('moment'); // To format the date

router.post('/', (req, res) => {
  const { eventName, eventContent } = req.body;
  const eventDate = moment().format('YYYY-MM-DD'); 
  const query = 'INSERT INTO events (EventName, EventDate, EventContent ) VALUES (?, ?, ?)';
  db.query(query, [eventName, eventDate, eventContent], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
    res.status(200).json({ message: 'Event added successfully' });
  });
});
module.exports = router;
