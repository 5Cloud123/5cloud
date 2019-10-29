/* eslint-disable camelcase */

const db = require('./db');

// Get specific song
module.exports.getSong = (song_id, res) => {
  const query1 = `SELECT * FROM songs WHERE song_id = '${song_id}' LIMIT 1;`;
  const query2 = `SELECT * FROM comments WHERE song_id = '${song_id}'`;
  // Insert information
  db.connection.query(query1, (err1, results1) => {
    if (err1) {
      res.end(err1);
    } else {
      db.connection.query(query2, (err2, results2) => {
        results1.push(results2);
        res.end(JSON.stringify(results1));
      });
    }
  });
};

module.exports.getOneSong = (req, res) => {
  const query = 'SELECT * FROM songs LIMIT 1;';
  // Insert information
  db.connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

module.exports.getThreeRandomSongs = res => {
  const query =
    'SELECT * FROM songs INNER JOIN comments ON songs.song_id = comments.song_id ORDER BY RAND() LIMIT 3;';
  // const query = 'SELECT * FROM songs ORDER BY song_name DESC LIMIT 3;';
  // Insert information
  db.connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};

module.exports.insertComments = comments => {
  const query = `INSERT INTO comments (song_id, user_name, time_stamp, comment) values ${comments}`;
  db.connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};
