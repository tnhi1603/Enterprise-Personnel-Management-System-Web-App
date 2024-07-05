const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const query = `
        SELECT NoticeID, NoticeTitle, NoticeDate FROM notices;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const noticeId = req.params.id;
    const query = `
        SELECT NoticeTitle, NoticeDate, NoticeContent 
        FROM notices 
        WHERE NoticeID = ?;
    `;

    db.query(query, [noticeId], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Notification not found');
        res.json(results[0]);
    });
});

router.put('/add/:id', (req, res) => {
    const { id } = req.params;
    const { NoticeTitle, NoticeDate, NoticeContent } = req.body;

    const query = `
        UPDATE notices 
        SET NoticeTitle = ?, NoticeDate = ?, NoticeContent = ?
        WHERE NoticeID = ?;
    `;

    db.query(query, [NoticeTitle, NoticeDate, NoticeContent, id], (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.affectedRows === 0) {
            return res.status(404).send('Notification not found');
        }

        res.json({ message: 'Notification updated successfully' });
    });
});
module.exports = router;
