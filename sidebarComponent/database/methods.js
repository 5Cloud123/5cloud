let db = require('./index.js');
const ImgixClient = require('imgix-core-js');
const config = require('../config.js');

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
	songsImgixURLs = songs.map((song) => {
        var client = new ImgixClient({
          domain: '5cloud.imgix.net',
          secureURLToken: config.imgixKey
        });
        var url = client.buildURL(song.song_art_url, {
          h:85,
          w:85
        });
        song.song_art_url = url;
        return song
        });
        res.send(songsImgixURLs);
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
	usersImgixURLs = users.map((user) => {
	var client = new ImgixClient({
	  domain: '5cloud.imgix.net',
	  secureURLToken: config.imgixKey
	});
	var url = client.buildURL(user.avatar_url, {
	  h:85,
	  w:85
	});
	user.avatar_url = url;
	return user
	});
	
        res.send(usersImgixURLs);
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
	usersImgixURLs = users.map((user) => {
        var client = new ImgixClient({
          domain: '5cloud.imgix.net',
          secureURLToken: config.imgixKey
        });
        var url = client.buildURL(user.avatar_url, {
          h:85,
          w:85
        });
        user.avatar_url = url;
        return user
        });
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
	playlistsImgixURLs = playlists.map((playlist) => {
        var client = new ImgixClient({
          domain: '5cloud.imgix.net',
          secureURLToken: config.imgixKey
        });
        var url = client.buildURL(playlist.playlist_art, {
          h:85,
          w:85
        });
        playlist.playlist_art = url;
        return playlist
        });
        res.send(playlistsImgixURLs);
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
	albumsImgixURLs = albums.map((album) => {
        var client = new ImgixClient({
          domain: '5cloud.imgix.net',
          secureURLToken: config.imgixKey
        });
        var url = client.buildURL(album.album_art, {
          h:85,
          w:85
        });
        album.album_art = url;
        return album
        });
        res.send(albumsImgixURLs);
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
