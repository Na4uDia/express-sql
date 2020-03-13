app.get("/comments", (request, response) => {
  db.query(
    `SELECT id, content, article_id FROM comments`,
    [],
    (err, rows, fields) => {
      if (err) {
        response.status(400).send(err);
      } else {
        response.send(rows);
      }
    }
  );
});

app.delete("/comments", (request, response) => {
  const data = request.query;
  if (data.id) {
    db.query(`DELETE FROM comments WHERE id=?`, [data.id], function(
      err,
      rows,
      fields
    ) {
      if (err) {
        response.status(400).send({ error: "Unable to delete comment " + err });
      } else {
        response.send({ status: "Deleted" });
      }
    });
  }
});

app.post("/comments", (request, response) => {
  const data = request.query;
  if (data.content && data.article_id) {
    if (data.id) {
      db.query(
        `UPDATE comments SET  content = ?, article_id = ? WHERE id = ?`,
        [data.content, data.article_id, data.id],
        function(err, rows, fields) {
          if (err) {
            response
              .status(400)
              .send({ error: "Unable to update comments " + err });
          } else {
            response.send({ status: "Updated" });
          }
        }
      );
    } else {
      db.query(
        `INSERT INTO comments VALUES(?, ?, ?)`,
        [null, data.content, data.article_id],
        function(err, rows, fields) {
          if (err) {
            response
              .status(400)
              .send({ error: "Unable to save new comment " + err });
          } else {
            response.send({ status: "Comment is added" });
          }
        }
      );
    }
  } else {
    response
      .status(400)
      .send({ error: "Content and article_id are required fields " + err });
  }
});
