
app.get('/comments', (request, response) => {
    db.all(`SELECT id, content, article_id FROM comments`, [], (err, rows) => {
      if (err) {
        response.status(400).send(err);
      }else{
        response.send(rows);
      }
    });
 });


  app.delete('/comments', (request, response) => {
    const data = request.query;
    if (data.id){
      db.run(`DELETE FROM comments WHERE id=?`, [data.id], function(err) {
        if (err) {
          response.status(400).send({error: 'Unable to delete comment ' + err});
        }else {
          response.send({status: 'Deleted'});
        }
      });
    }
  });


  app.post('/comments', (request, response) => {
    const data = request.query;
    if (data.article_id && data.content){
      if (data.id){
        db.run(`UPDATE comments SET article_id = ?, content = ? WHERE id = ?`, [data.article_id, data.content, data.id], function(err) {
          if (err) {
            response.status(400).send({error: 'Unable to update comments ' + err});
          } else {
            response.send({status: 'Updated'});
          }
        });
      }else{
        db.run(`INSERT INTO comments (content, article_id) VALUES(?, ?)`, [data.article_id, data.content], function(err) {
          if (err) {
            response.status(400).send({error: 'Unable to save new comment'});
          }else {
            response.send({status: 'Added comment'});
          }
        });
      }
    }else{
      response.status(400).send({error: 'article_id and content are required fields'});
    }
  });
