// server/routes/posts.js
// Title: Posts Route
// Purpose: Handles scheduling and retrieving posts

const express = require('express');
const router = express.Router();
const { scheduledPosts, schedulePost } = require('../index');

router.get('/scheduled', (req, res) => {
  res.json(scheduledPosts);
});

router.post('/schedule', (req, res) => {
  const { caption, time } = req.body; // Add imageUrl in a real app

  if (!caption || !time) {
    return res.status(400).json({ error: 'Caption and time are required' });
  }

  const post = { id: Date.now().toString(), caption, time };
  scheduledPosts.push(post);
  schedulePost(post);

  res.json({ message: `Post scheduled for ${time}` });
});

module.exports = router;
