const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

app = express();
app.use(cors());

require('./routes/articles');
require('./routes/comments');

db = new sqlite3.Database('./db/articles.db', (err) => {
    if (err) {
        console.error(err.message);
    } else{
    console.log('Connected to the articles database.');}
});
  

app.listen(3000, '127.0.0.1', function () {
    console.log("Server started on host: localhost, port: 3000");
    });