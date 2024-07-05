const express = require('express');
const router = express.Router();
const db = require('../db');

// Lấy danh sách dự án
router.get('/', (req, res) => {
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const sql = `
    SELECT * FROM Project
    ORDER BY 
      CASE 
        WHEN EndDay < ? THEN 1 
        ELSE 0 
      END, EndDay DESC
  `;

  db.query(sql, [currentDateTime], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const expiredProjects = results.filter(project => project.EndDay < currentDateTime);
    const activeProjects = results.filter(project => project.EndDay >= currentDateTime);

    res.status(200).json({ activeProjects, expiredProjects });
  });
});

router.get('/:id', async (req, res) => {
  try {
    const project = await project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project = await project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


module.exports = router;
