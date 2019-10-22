/* eslint-disable camelcase */
const mysql = require('mysql');

// Create connection
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.HR_FRONTEND_MYSQL_PASSWORD,
  database: '5cloud_song_display',
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('\nConnected to the MySQL server.\n');
});

// Get specific song
const getSong = (song_id, res) => {
  const query1 = `SELECT * FROM songs WHERE song_id = '${song_id}' LIMIT 1;`;
  const query2 = `SELECT * FROM comments WHERE song_id = '${song_id}'`;
  // Insert information
  connection.query(query1, (err1, results1) => {
    if (err1) {
      res.end(err1);
    } else {
      connection.query(query2, (err2, results2) => {
        results1.push(results2);
        res.end(JSON.stringify(results1));
      });
    }
  });
};

const getOneSong = (req, res) => {
  const query = 'SELECT * FROM songs LIMIT 1;';
  // Insert information
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

const getThreeRandomSongs = (res) => {
  const query =
    'SELECT * FROM songs INNER JOIN comments ON songs.song_id = comments.song_id ORDER BY RAND() LIMIT 3;';
  // const query = 'SELECT * FROM songs ORDER BY song_name DESC LIMIT 3;';
  // Insert information
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

const getTenSongs = (res) => {
  const query = 'SELECT * FROM songs LIMIT 10;';
  // Insert information
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

const getAllSongs = (res) => {
  const query = 'SELECT * FROM songs;';
  // Insert information
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

const insertComments = (comments) => {
  const query = `INSERT INTO comments (song_id, user_name, time_stamp, comment) values ${comments}`;
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

module.exports.getTenSongs = getTenSongs;
module.exports.getOneSong = getOneSong;
module.exports.getAllSongs = getAllSongs;
module.exports.getThreeRandomSongs = getThreeRandomSongs;
module.exports.insertComments = insertComments;
module.exports.getSong = getSong;
