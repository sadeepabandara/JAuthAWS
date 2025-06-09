const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'SIT772',
});

db.connect((error) => {
  if (error) {
    console.error('Database connection failed:', error);
  } else {
    console.log('Connected to MySQL Database');
  }
});

module.exports = db;
