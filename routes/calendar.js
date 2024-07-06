const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/projects', (req, res) => {
    const query = 'SELECT ProjectID, ProjectName, StartDay, EndDay FROM project';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching projects:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });
  
  // Endpoint to get all events
  router.get('/events', (req, res) => {
    const query = 'SELECT EventID, EventDate, EventName FROM events';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching events:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  module.exports = router;