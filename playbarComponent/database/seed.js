var data = require('./seed_data.js');
var mysql = require('mysql');
const fs = require('fs');
const csvParser = require('csv-parse');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'musicDB'
});

connection.connect();

const filePath = '/Users/richardcao/Downloads/5cloud Song List - Sheet1.csv';

var seedDb = function(data) {
  fs.readFile(
    filePath,
    {
      encoding: 'utf-8',
    },
    (err, csvData) => {
      if (err) {
        console.error(err);
      }

      csvParser(
        csvData,
        {
          columns: true,
          delimiter: ',',
        },
        (err, data) => {
          if (err) {
            console.error(err);
          } else {
            let songs = data;
            console.log(songs);

            //  Load into table 'songs'
            for (let i = 0; i < songs.length; i++) {
              var insertSongsQuery =
                'INSERT INTO songs(songName,songId, songNameURL, songArtURL, artistName) VALUES (?,?,?,?,?)';
              var songName = songs[i].song_name;
              var songId = songs[i].song_id;
              var songURL = songs[i].song_data_url;
              var songArt = songs[i].song_art_url;
              var artistName = songs[i].artist_name;
              var queryArgs = [songName, songId, songURL, songArt, artistName];

              connection.query(insertSongsQuery, queryArgs, (err, results) => {
                if (err) {
                  console.log('Could not insert into database!');
                } else {
                  console.log('Inserted into database!');
                }
              });
            }
          }
        }
      );
    }
  );
};

// var insertArtistsQuery = 'INSERT INTO artists(artistName) VALUES(?)';
// connection.query(insertArtistsQuery, (err, data) =>{
//   if(err){
//       console.log('Could not insert into artists table!');
//   } else {
//       console.log('Inserted into artists table!');
//   }
// });

seedDb(data);
