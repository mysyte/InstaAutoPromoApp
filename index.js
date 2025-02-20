// server/index.js
// Title: Main Server File
// Purpose: Sets up the Express server and initializes scheduled jobs

const express = require('express');
const schedule = require('node-schedule');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Store scheduled posts in memory (use a database in production)
let scheduledPosts = [];

// Import routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Sample scheduled job (for demonstration)
const schedulePost = (post) => {
  schedule.scheduleJob(new Date(post.time), () => {
    console.log(`Posting to Instagram: ${post.caption}`);
    // In a real app, call the Instagram API here
  });
};

// Initialize existing scheduled posts
scheduledPosts.forEach(schedulePost);

app.get('/', (req, res) => res.send('Auto-Promotion Server is running'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = { scheduledPosts, schedulePost };
