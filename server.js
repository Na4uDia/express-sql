const express = require("express");
const cors = require("cors");

app = express();
app.use(cors());

require("./db/db");
require("./routes/articles");
require("./routes/comments");
require("./routes/user");

app.listen(3000, "127.0.0.1", function() {
  console.log("Server started on host: localhost, port: 3000");
});
