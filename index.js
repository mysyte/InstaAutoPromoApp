const express = require('express');
const schedule = require('node-schedule');
const app = express();

app.get('/', (req, res) => res.send('Auto-Promotion Server'));

const postToInstagram = () => console.log('Posting at 6 PM!');
schedule.scheduleJob('0 18 * * *', postToInstagram);

app.listen(3000, () => console.log('Server running on port 3000'));
