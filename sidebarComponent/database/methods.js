let db = require('./index.js');

let getCurrentSong = function(req, res) {
  db.query(
    `select * from songs where song_id = "${req.params.songid}"`,
    (err, song) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(song);
      }
    }
  );
};

let getRelatedTracks = function(req, res) {
  db.query(
    `select * from songs where tag = (select tag from songs where song_id = "${req.params.songid}")`,
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
    `select * from users where id in (select user from song_user_likes where song = (select id from songs where song_id = "${req.params.songid}"))`,
    (err, users) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    }
  );
};

let getUsersRepost = function(req, res) {
  db.query(
    `select * from users where id in (select user from song_user_reposts where song = (select id from songs where song_id = "${req.params.songid}"))`,
    (err, users) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(users);
      }
    }
  );
};

let getInclusivePlaylists = function(req, res) {
  db.query(
    `select * from playlists where id in (select playlist from playlist_song_included where song = (select id from songs where song_id =  "${req.params.songid}"))`,
    (err, playlists) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(playlists);
      }
    }
  );
};

let getInclusiveAlbums = function(req, res) {
  db.query(
    `select * from albums where id in (select album from album_song_included where song = (select id from songs where song_id = "${req.params.songid}"))`,
    (err, albums) => {
      if (err) {
        console.log(err);
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
module.exports.getCurrentSong = getCurrentSong;
