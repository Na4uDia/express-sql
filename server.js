const express = require('express');
const cors = require('cors');

app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
require('./db/db');
require('./routes/articles');
require('./routes/comments');
require('./routes/auth/auth');
=======
require("./db/db");
require("./routes/articles");
require("./routes/comments");
require("./routes/auth");
>>>>>>> b4c5f5b3136fca26914df9ecd11a4e82ce7e9c2f

app.listen(3000, '127.0.0.1', function() {
  console.log('Server started on host: localhost, port: 3000');
});
