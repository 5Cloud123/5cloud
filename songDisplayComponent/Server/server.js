/* eslint-disable camelcase */
const express = require('express');
const path = require('path');
const db = require('../db/Model');
const compression = require('compression');

const app = express();

// Sidebar is on port 5000; use 5001
const port = 5001;

// CORS Policy
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Compress files
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

// Serve the static index file from the React app
app.use('/:song_id', express.static(path.join(__dirname, '../public/')));

// Get specific song
app.get('/query/getSong/:song_id', (req, res) => {
  const song_id = req.params.song_id;
  db.getSong(song_id, res);
});

// Return stringified JSON of all 100 song information objects from mysql
app.get('/query/all-songs', (req, res) => db.getAllSongs(res));

// Return only ten songs
app.get('/query/ten-songs', (req, res) => db.getTenSongs(res));

// Return only three songs
app.get('/query/three-songs', (req, res) => db.getThreeRandomSongs(res));

// Return only one song
app.get('/query/one-song', (req, res) => db.getOneSong(res));

app.listen(port, () => console.log(`Express App running on port ${port}`));
