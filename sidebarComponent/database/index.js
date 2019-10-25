let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: process.env.HR_FRONTEND_MYSQL_PASSWORD,
  database: '5cloud',
});

connection.connect();

module.exports = connection;
