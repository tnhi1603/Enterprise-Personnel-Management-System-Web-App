const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const moment = require('moment'); // To format the date

const upload = multer({
  dest: 'uploads/', // Directory to store uploaded files
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

router.post('/', upload.single('attachment'), (req, res) => {
  const { noticeTitle, noticeContent } = req.body;
  const attachment = req.file ? req.file.filename : null;
  const noticeDate = moment().format('YYYY-MM-DD'); 
  const query = 'INSERT INTO notices (NoticeTitle, NoticeDate, NoticeContent, Attachment) VALUES (?, ?, ?, ?)';
  db.query(query, [noticeTitle, noticeDate, noticeContent, attachment], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }
    res.status(200).json({ message: 'Notification added successfully' });
  });
});

module.exports = router;
