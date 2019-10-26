let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: '',
  database: '5cloud'
});

connection.connect();

module.exports = connection;
