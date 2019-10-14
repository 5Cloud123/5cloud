let express = require('express');
let db = require('../database/methods.js');

let app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());

app.get('/relatedtracks/:songid', (req, res) => {
  db.getRelatedTracks(req, res);
});

app.get('/userlike/:songid', (req, res) => {
  db.getUsersLiked(req, res);
});

app.get('/userrepost/:songid', (req, res) => {
  db.getUsersRepost(req, res);
});

app.get('/playlistincluded/:songid', (req, res) => {
  db.getInclusivePlaylists(req, res);
});

app.get('/albumincluded/:songid', (req, res) => {
  db.getInclusiveAlbums(req, res);
});

//new idea: use one route that accepts the song_id and it GETs all of the above information by
//calling each of the premade mysql methods
