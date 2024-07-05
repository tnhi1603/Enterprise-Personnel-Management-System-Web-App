const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../db'); 

router.get('/members/online', (req, res) => {
    const query = 'SELECT COUNT(*) AS onlineMembers FROM Checkin WHERE DateOfCheckIn = CURDATE() AND NumberOfLate > 0';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

router.get('/projects/active', (req, res) => {
    const query = 'SELECT COUNT(*) AS activeProjects FROM Project WHERE EndDay IS NULL OR EndDay > NOW()';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

router.get('/requests/pending', (req, res) => {
    const query = 'SELECT COUNT(*) AS pendingRequests FROM Request WHERE Status = "Pending"';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

router.get('/events', (req, res) => {
    const query = 'SELECT EventID, EventName, EventDate FROM Events';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/notices', (req, res) => {
    const query = 'SELECT NoticeID, NoticeTitle, NoticeDate FROM Notices';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

module.exports = router;
