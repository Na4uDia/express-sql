
app.get('/articles', (request, response) => {
    db.all(`SELECT rowid, title, body FROM articles`, [], (err, rows) => {
      if (err) {
        response.status(400).send(err);
      }else{
        response.send(rows);
      }
    });
 });

//  app.post('/articles', (request, response) => {
//     if (request.query.title && request.query.body){
//       db.serialize(() => db.run(`INSERT INTO articles VALUES(?, ?)`, [request.query.title, request.query.body], function(err) {
//         if (err) {
//           response.status(400).send({error: 'Unable to save new article' + err});
//         }else {
//           response.send({status: 'OK'});
//         }
//       }));
//     }else{
//       response.status(400).send({error: 'title and body are required fields'});
//     }
//   });

  app.delete('/articles', (request, response) => {
    const data = request.query;
    if (data.rowid){
      db.run(`DELETE FROM articles WHERE rowid=?`, [data.rowid], function(err) {
        if (err) {
          response.status(400).send({error: 'Unable to delete article ' + err});
        }else {
          response.send({status: 'OK'});
        }
      });
    }
  });


  app.post('/articles', (request, response) => {
    const data = request.query;
    if (data.title && data.body){
      if (data.rowid){
        db.serialize(() => db.run(`UPDATE articles SET title = ?, body = ? WHERE rowid = ?`, [data.title, data.body, data.rowid], function(err) {
          if (err) {
            response.status(400).send({error: 'Unable to update article ' + err});
          }else {
            response.send({status: 'OK'});
          }
        }));
      }else{
        db.serialize(() => db.run(`INSERT INTO articles VALUES(?, ?)`, [data.title, data.body], function(err) {
          if (err) {
            response.status(400).send({error: 'Unable to save new article'});
          }else {
            response.send({status: 'OK'});
          }
        }));
      }
    }else{
      response.status(400).send({error: 'title and body are required fields'});
    }
  });
