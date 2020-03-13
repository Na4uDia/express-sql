app.get("/articles", (request, response) => {
  db.query("SELECT id, title, body FROM articles", function(err, rows, fields) {
    if (err) {
      response.status(400).send(err);
    } else {
      response.send(rows);
    }
  });
});

app.delete("/articles", (request, response) => {
  const data = request.query;
  if (data.id) {
    db.query(`DELETE FROM articles WHERE id=?`, [data.id], function(
      err,
      rows,
      fields
    ) {
      if (err) {
        response.status(400).send({ error: "Unable to delete article " + err });
      } else {
        response.send({ status: "Deleted" });
      }
    });
  }
});

app.post("/articles", (request, response) => {
  const data = request.query;
  if (data.title && data.body) {
    if (data.id) {
      db.query(
        `UPDATE articles SET title = ?, body = ? WHERE id = ?`,
        [data.title, data.body, data.id],
        function(err, rows, fields) {
          if (err) {
            response
              .status(400)
              .send({ error: "Unable to update article " + err });
          } else {
            response.send({ status: "Updated" });
          }
        }
      );
    } else {
      db.query(
        `INSERT INTO articles VALUES(?, ?, ?)`,
        [null, data.title, data.body],
        function(err, rows, fields) {
          if (err) {
            response.status(400).send({ error: "Unable to save new article" });
          } else {
            response.send({ status: "Article is added" });
          }
        }
      );
    }
  } else {
    response.status(400).send({ error: "Title and body are required fields" });
  }
});
