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

module.exports.getTenSongs = getTenSongs;
