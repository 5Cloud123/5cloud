const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'musicDB'
});

connection.connect(() => console.log('DB is connected!'));

module.exports = connection;
