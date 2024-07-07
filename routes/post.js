const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your actual db module

// Get all posts with replies
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM Post
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      res.status(500).send(err);
      return;
    }
    const posts = {};
    results.forEach(row => {
      if (!posts[row.PostID]) {
        posts[row.PostID] = {
          id: row.PostID,
          author: row.StaffID,
          content: row.Post,
          timestamp: row.DateTime,
          comments: []
        };
      }
    });
    res.json(Object.values(posts));
  });
});

// Create a new post
router.post('/', (req, res) => {
  const { staffId, content } = req.body;
  const query = 'INSERT INTO Post (StaffID, Post, DateTime) VALUES (?, ?, NOW())';
  db.query(query, [staffId, content], (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      res.status(500).send(err);
      return;
    }
    res.json({ id: result.insertId });
  });
});

// Create a new reply
router.post('/replies', (req, res) => {
  const { postId, staffId, content } = req.body;
  const query = 'INSERT INTO Communication (Reply, PostID, StaffID) VALUES (?, ?, ?)';
  db.query(query, [content, postId, staffId], (err, result) => {
    if (err) {
      console.error('Error creating reply:', err);
      res.status(500).send(err);
      return;
    }
    res.json({ id: result.insertId });
  });
});

module.exports = router;
