let mysql = require('mysql');

let connection = mysql.connect({
  username: 'root',
  password: '',
  database: '5cloud'
});

connection.connect();

module.exports = connection;
