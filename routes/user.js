app.get("/user", (request, response) => {
  db.query(`SELECT id, user, pass FROM users`, [], (err, rows, fields) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.send(rows);
    }
  });
});

app.get("/login", (request, response) => {
  const data = request.query;
  if (data.user) {
    db.query(
      `SELECT user FROM users WHERE user = ?`,
      [data.user],
      (err, rows, fields) => {
        if (err) {
          response.status(400).send(err);
        } else {
          response.send({ status: "Hello, " + data.user });
        }
      }
    );
  }
});

app.post("/user", (request, response) => {
  const data = request.query;
  if (data.user && data.pass) {
    db.query(
      `INSERT INTO users VALUES(?, ?, ?)`,
      [null, data.user, data.pass],
      function(err, rows, fields) {
        if (err) {
          response
            .status(400)
            .send({ error: "Unable to register new user " + err });
        } else {
          response.send({ status: "Registration is successful" });
        }
      }
    );
  } else {
    response
      .status(400)
      .send({ error: "User and pass are required fields " + err });
  }
});
