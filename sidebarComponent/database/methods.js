let db = require('./index.js');

let getRelatedTracks = function(req, res) {
  db.query(
    `select * from songs where tag = "${req.body.tag}"`,
    (err, songs) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(songs);
      }
    }
  );
};

let getUsersLiked = function(req, res) {
  db.query(
    `select * from users where id = (select user from song_user_likes where song = "${req.body.id}")`,
    (err, users) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    }
  );
};

let getUsersRepost = function(req, res) {
  db.query(
    `select * from users where id = (select user from song_user_reposts where song = ${req.body.id})`,
    (err, users) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    }
  );
};

let getInclusivePlaylists = function(req, res) {
  db.query(
    `select * from playlists where id = (select playlist from playlist_song_included where song = ${req.body.id})`,
    (err, playlists) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(playlists);
      }
    }
  );
};

let getInclusiveAlbums = function(req, res) {
  db.query(
    `select * from albums where id = (select album from album_song_included where song = ${req.body.id})`,
    (err, albums) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(albums);
      }
    }
  );
};

module.exports.getRelatedTracks = getRelatedTracks;
module.exports.getUsersLiked = getUsersLiked;
module.exports.getUsersRepost = getUsersRepost;
module.exports.getInclusivePlaylists = getInclusivePlaylists;
module.exports.getInclusiveAlbums = getInclusiveAlbums;
