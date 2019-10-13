/* eslint-disable indent */
let db = require('./index.js');

let fs = require('fs');
let parse = require('csv-parse');
const results = [];

let ignore = 1;
let songsPath =
  '/Users/Nick/Repos/HackReactor/5cloud/5cloud/sidebarComponent/database/seedData/songlist.csv';
let usersPath =
  '/Users/Nick/Repos/HackReactor/5cloud/5cloud/sidebarComponent/database/seedData/userlist.csv';
let playlistPath =
  '/Users/Nick/Repos/HackReactor/5cloud/5cloud/sidebarComponent/database/seedData/playlistlist.csv';
let albumPath =
  '/Users/Nick/Repos/HackReactor/5cloud/5cloud/sidebarComponent/database/seedData/albumlist.csv';

let seedSongs = function() {
  fs.readFile(songsPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('this will run second');
      parse(data, (err, output) => {
        if (err) {
          console.log(err);
        } else {
          for (let i = 1; i < output.length; i++) {
            let queryString = `insert into songs (song_id, song_name, artist_name, date_posted, tag, like_count, play_count, repost_count, comment_count) VALUES ("${
              output[i][0]
            }", "${output[i][1]}", "${output[i][2]}", "${output[i][3]}", "${
              output[i][4]
            }", "${output[i][5] ? parseInt(output[i][5]) : 0}", "${
              output[i][6] ? parseInt(output[i][6]) : 0
            }", "${output[i][7] ? parseInt(output[i][7]) : 0}", "${
              output[i][8] ? parseInt(output[i][8]) : 0
            }")`;
            db.query(queryString, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log('we saved a song into the DB');
              }
            });
          }
        }
      });
    }
  });
};

let seedUsers = function() {
  fs.readFile(usersPath, (err, data) => {
    if (err) {
      console.log(err, 'there was an error reading the file');
    } else {
      parse(data, (err, output) => {
        if (err) {
          console.log(err, 'there was an error parsing');
        } else {
          console.log(output);
          for (let i = 1; i < output.length; i++) {
            let queryString = `insert into users (user_id, username, pro_unlimited, follower_count, phys_location) VALUES ("${
              output[i][0]
            }",
            "${output[i][1]}", "${output[i][2]}", "${parseInt(
              output[i][3]
            )}", "${output[i][4]}")`;
            db.query(queryString, (err, data) => {
              if (err) {
                console.log(err, 'there was an error saving records to the DB');
              } else {
                console.log('we saved a user to the DB');
              }
            });
          }
        }
      });
    }
  });
};

let seedPlaylists = function() {
  fs.readFile(playlistPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      parse(data, (err, output) => {
        if (err) {
          console.log(err);
        } else {
          for (let i = 1; i < output.length; i++) {
            let queryString = `insert into playlists (playlist_name, like_count, repost_count) VALUES ("${
              output[i][0]
            }", "${parseInt(output[i][1])}", "${parseInt(output[i][2])}")`;
            db.query(queryString, (err, entries) => {
              if (err) {
                console.log(
                  err,
                  'there was an error saving playlists to the DB'
                );
              } else {
                console.log('we saved a playlist to the DB');
              }
            });
          }
        }
      });
    }
  });
};

let seedAlbums = function() {
  fs.readFile(albumPath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      parse(data, (err, output) => {
        if (err) {
          console.log(err);
        } else {
          for (let i = 1; i < output.length; i++) {
            let queryString = `insert into albums (user, album_name, year_posted) VALUES ("${
              output[i][0]
            }", "${output[i][1]}", "${parseInt(output[i][2])}")`;
            db.query(queryString, (err, entries) => {
              if (err) {
                console.log(err, 'there was an error saving alubms to the DB');
              } else {
                console.log('we saved an album to the DB');
              }
            });
          }
        }
      });
    }
  });
};

seedSongs();
seedUsers();
seedPlaylists();
seedAlbums();
