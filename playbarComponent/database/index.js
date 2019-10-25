const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: process.env.HR_FRONTEND_MYSQL_PASSWORD,
  database: 'musicDB',
});

connection.connect(() => console.log('DB is connected!'));

module.exports = connection;
