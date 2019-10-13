let express = require('express');
let db = require('../database/methods.js');

let app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());

app.post('/relatedtracks', (req, res) => {
  db.getRelatedTracks(req, res);
});

app.post('/userlike', (req, res) => {
  db.getUsersLiked(req, res);
});

app.post('/userrepost', (req, res) => {
  db.getUsersRepost(req, res);
});

app.post('/playlistincluded', (req, res) => {
  db.getInclusivePlaylists(req, res);
});

app.post('/albumincluded', (req, res) => {
  db.getInclusiveAlbums(req, res);
});
