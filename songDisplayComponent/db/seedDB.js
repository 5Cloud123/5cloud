const mysql = require('mysql');
const fs = require('fs');
const csvParser = require('csv-parse');

// Create connection
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.HR_FRONTEND_MYSQL_PASSWORD,
  // password: '123454321',
  database: '5cloud_song_display',
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('\nConnected to the MySQL server.\n');
});

connection.query('SELECT * FROM songs', function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
  // console.log(results);
});

// Open seed csv file
const filePath = '/Users/jonathanolson/Downloads/5cloud Song List - Sheet1.csv';

let songs;

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
          songs = data;

          //  Load into table 'songs'
          for (let i = 0; i < songs.length; i++) {
            // Convert string time to integer time
            const intTime = Date.parse(songs[i].date_posted);
            // Create query to insert each entry's information
            const query = `INSERT INTO songs (song_id, song_name, artist_name, upload_time, tag) VALUES ("${songs[i].song_id}", "${songs[i].song_name}", "${songs[i].artist_name}", "${intTime}", "${songs[i].tag}");`;
            // Insert information
            connection.query(query, (err, results, fields) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Data successfully inserted in MySQL!!');
              }
            });
          }
        }
      }
    );
  }
);

// Create docker container for mysql
// docker run -p 3306:3306 --name 5clouddb -e MYSQL_ROOT_PASSWORD=123454321 -v /Users/jonathanolson/HackReactor/FrontEndCapstone/db/schema.sql:/schema.sql -d mysql:5.7

// Get into docker container
// docker exec -it 5clouddb bash

// Load .sql file into mysql
// mysql -p < schema.sql

// Get into mysql
// mysql -p
