const express = require('express');
const path = require('path');
const db = require('../db/db');

const app = express();

// Sidebar is on port 5000; use 5001
const port = 5001;

// Serve the static index file from the React app
app.use(express.static(path.join(__dirname, '../public/')));

app.get('/', (req, res) => {
  res.end('Get / WORKS');
});

// Return stringified JSON of all 100 song information objects from mysql
app.get('/all-songs', (req, res) => db.getAllSongs(res));

// Return only ten songs
app.get('/ten-songs', (req, res) => db.getTenSongs(res));

// Return only three songs
app.get('/three-songs', (req, res) => db.getThreeRandomSongs(res));

// Return only one song
app.get('/one-song', (req, res) => db.getOneSong(res));

app.listen(port, () => console.log(`Express App running on port ${port}`));
