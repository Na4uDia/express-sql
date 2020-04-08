<<<<<<< HEAD
const tokenUtils = require('./auth/token-utils');
const articlesDac = require('../dac/articles');

app.get('/articles', (request, response) => {
  tokenUtils.getDecodedToken(request)
      .then((decoded) => articlesDac.getArticle()
          .then((articles) => response.send(articles)))
      .catch((error) => response.status(error.status).send(error.message));
=======
var config = require("../token-config.js");
var jwt = require("jsonwebtoken");

app.use("/articles", function(request, response, next) {
  const data = request.query;
  var token = data.access_token;
  if (!token)
    return response
      .status(401)
      .send({ auth: false, message: "No token provided." });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return response
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    db.query(
      "SELECT * FROM users where id=? AND pass=?",
      [decoded.id, decoded.pass],
      function(err, rows, fields) {
        if (err) {
          response.status(400).send(err);
        } else {
          next();
        }
      }
    );
  });
});

app.get("/articles", (request, response) => {
  db.query("SELECT id, title, body FROM articles", function(err, rows, fields) {
    if (err) {
      response.status(400).send(err);
    } else {
      response.send(rows);
    }
  });
>>>>>>> b4c5f5b3136fca26914df9ecd11a4e82ce7e9c2f
});

app.delete('/articles', (request, response) => {
  const data = request.query;
  if (data.id) {
    tokenUtils.getDecodedToken(request)
        .then((decoded) => articlesDac.deleteArticle(data.id, decoded.id)
            .then((deleteStatus) => response.send(deleteStatus)))
        .catch((error) => response.status(error.status).send(error.message));
  }
});

app.post('/articles', (request, response) => {
  const data = request.query;
  if (data.title && data.body) {
    if (data.id) {
      tokenUtils.getDecodedToken(request)
          .then((decoded) => articlesDac.updateArticle(
              data.id, decoded.id, data.title, data.body))
          .then((updateStatus) => response.send(updateStatus))
          .catch((error) => response.status(error.status).send(error.message));
    } else {
      tokenUtils.getDecodedToken(request)
          .then((decoded) => articlesDac.insertArticle(data.title, data.body, decoded.id)
              .then((insertStatus) => response.send(insertStatus)))

          .catch((error) => response.status(error.status).send(error.message));
    };
  } else {
<<<<<<< HEAD
    response.status(400).send({
      error: 'Title and body are required fields.',
    });
=======
    response.status(400).send({ error: "title and body are required fields" });
>>>>>>> b4c5f5b3136fca26914df9ecd11a4e82ce7e9c2f
  }
});
