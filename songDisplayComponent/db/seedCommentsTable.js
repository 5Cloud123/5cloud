const mysql = require('mysql');
const generateComments = require('./commentsCreator');

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

// Store comments information
const comments = generateComments();

// Create query to insert each entry's information
const query =
  'INSERT INTO comments (song_id, user_name, time_stamp, comment) VALUES ?';
// Insert information
connection.query(query, [comments], (err, results, fields) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Comments successfully inserted in MySQL!!');
    // connection.end();
  }
});
