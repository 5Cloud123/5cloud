const express = require('express');
const path = require('path');
const db = require('../database/index.js');

const app = express();

//sidebar: 5000, songdisplay: 5001
const PORT = 5002;

// app.use(express.static(path.join(__dirname, '../public/')));
app.use('/:song_id', express.static(path.join(__dirname, '../public/')));

// CORS Policy
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.listen(PORT, () => console.log('Server is listening on port ', PORT));

app.get('/songs', (req, res) => {
  var getAllQuery = 'SELECT * FROM songs';
  db.query(getAllQuery, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.log('could not query db');
    } else {
      console.log('Inserted into songs table');
      res.status(200).send(data);
    }
  });
});

//serve bundle
// app.use('/app.js', express.static(path.join(__dirname, '../public/bundle.js')));
