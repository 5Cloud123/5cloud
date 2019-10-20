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

const getOneSong = (res) => {
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
  const query = 'SELECT * FROM songs ORDER BY RAND() LIMIT 3;';
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
