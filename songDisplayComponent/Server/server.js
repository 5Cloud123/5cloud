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

app.get('/all-songs', (req, res) => db.getAllSongs(res));

app.get('/ten-songs', (req, res) => db.getTenSongs(res));

app.listen(port, () => console.log(`Express App running on port ${port}`));

/*

Output Data:

({
  "Id": 1,
  "song_id": "Song_00001",
  "song_name": "All I Got",
  "artist_name": "Said the Sky",
  "upload_time": 1494572400000,
  "tag": "#electronic"
},
{
  "Id": 2,
  "song_id": "Song_00002",
  "song_name": "Flicker",
  "artist_name": "Porter Robinson",
  "upload_time": 1470985200000,
  "tag": "#electronic"
},
{
  "Id": 3,
  "song_id": "Song_00003",
  "song_name": "Say My Name",
  "artist_name": "Odesza",
  "upload_time": 1485072000000,
  "tag": "#electronic"
},
{
  "Id": 4,
  "song_id": "Song_00004",
  "song_name": "Indian Summer",
  "artist_name": "Jai Wolf",
  "upload_time": 1420617600000,
  "tag": "#electronic"
},
{
  "Id": 5,
  "song_id": "Song_00005",
  "song_name": "Insane",
  "artist_name": "Flume",
  "upload_time": 1401865200000,
  "tag": "#electronic"
},
{
  "Id": 6,
  "song_id": "Song_00006",
  "song_name": "JUMP",
  "artist_name": "DROELOE",
  "upload_time": 1513065600000,
  "tag": "#electronic"
},
{
  "Id": 7,
  "song_id": "Song_00007",
  "song_name": "High You Are",
  "artist_name": "What So Not",
  "upload_time": 1420617600000,
  "tag": "#electronic"
},
{
  "Id": 8,
  "song_id": "Song_00008",
  "song_name": "Poison For Lovers",
  "artist_name": "ARTY",
  "upload_time": 1401865200000,
  "tag": "#electronic"
},
{
  "Id": 9,
  "song_id": "Song_00009",
  "song_name": "I Wanna Know",
  "artist_name": "RL Grime",
  "upload_time": 1502262000000,
  "tag": "#electronic"
},
{
  "Id": 10,
  "song_id": "Song_00010",
  "song_name": "Sleepy Eyes",
  "artist_name": "Elohim",
  "upload_time": 1516608000000,
  "tag": "#electronic"
})

*/
