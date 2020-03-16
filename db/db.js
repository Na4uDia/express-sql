const mysql = require('mysql');

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'articles',
});

db.connect();
