let mysql = require('mysql');

let connection = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: '5cloud'
});

connection.connect();

module.exports = connection;
