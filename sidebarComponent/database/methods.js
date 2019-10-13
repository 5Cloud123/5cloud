let db = require('./index.js');

let getAllSongNames = function(req, res) {
  db.query('select (song_name) from songs', (err, songs) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(songs);
    }
  });
};

module.exports.getAllSongNames = getAllSongNames;
