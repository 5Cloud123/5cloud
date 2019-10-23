const express = require('express');
const path = require('path');
const db = require('../database/index.js');

const app = express();

//sidebar: 5000, songdisplay: 5001
const PORT = 5002;

app.use(express.static(path.join(__dirname, '../public/')));

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
app.use('/app.js', express.static(path.join(__dirname, '../public/bundle.js')));
