let express = require('express');
let mysql = require('../database/methods.js');

let app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());

app.use('/sidebar', (req, res) => {
  console.log('getting hit with GET req');
  mysql.getAllSongNames(req, res);
});
