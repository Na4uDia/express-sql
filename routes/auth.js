var jwt = require("jsonwebtoken");
var crypto = require("crypto");
var config = require("../token-config.js");

app.get("/user", (request, response) => {
  db.query(`SELECT id, name, pass FROM users`, [], (err, rows, fields) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.send(rows);
    }
  });
});

app.post("/register", (request, response) => {
  const data = request.query;
  var hashedPassword = crypto
    .createHash("md5")
    .update(data.pass)
    .digest("hex");
  if (data.name && data.pass) {
    db.query(
      `INSERT INTO users VALUES(?, ?, ?)`,
      [null, data.name, hashedPassword],
      function(err, rows, fields) {
        if (err) {
          response
            .status(400)
            .send({ error: "Unable to register new user " + err });
        } else {
          var token = jwt.sign(
            { id: rows.insertId, pass: hashedPassword },
            config.secret,
            {
              expiresIn: 86400 // expires in 24 hours
            }
          );
          response.send({
            status: "Registration is successful",
            auth: true,
            token: token
          });
        }
      }
    );
  } else {
    response
      .status(400)
      .send({ error: "name and pass are required fields " + err });
  }
});

app.post("/login", (request, response) => {
  const data = request.query;
  var hashedPassword = crypto
    .createHash("md5")
    .update(data.pass)
    .digest("hex");
  if (data.name) {
    db.query(
      `SELECT * FROM users WHERE name = ? AND pass = ?`,
      [data.name, hashedPassword],
      (err, rows, fields) => {
        if (err) {
          response.status(400).send(err);
        } else {
          if (rows.length === 0) {
            response.status(400).send({ error: "Incorrect name or password " });
          } else {
            var token = jwt.sign(
              { id: rows.id, pass: hashedPassword },
              config.secret,
              {
                expiresIn: 86400 // expires in 24 hours
              }
            );
            response.send({
              status: "Hello, " + data.name,
              auth: true,
              token: token
            });
          }
        }
      }
    );
  }
});
