const jwt = require('jsonwebtoken');
const config = require('./token-config.js');
const ResponseError = require('./response-error');

const getTokenUserId = (request) => {
  const promise = new Promise((resolve, reject) => {
    getDecodedToken(request)
        .then((decoded) => {
          db.query('SELECT * FROM users where id=? AND pass=?',
              [decoded.id, decoded.pass], function(error, rows, fields) {
                if (error) {
                  reject(new ResponseError(error, 400));
                } else {
                  resolve(rows[0]);
                }
              });
        })
        .catch((error) => reject(error));
  });
  return promise;
};

const getDecodedToken = (request) => {
  const promise = new Promise((resolve, reject) => {
    const data = request.query;
    const token = data.access_token;
    if (!token) {
      reject(new ResponseError('No token provided.', 401));
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        reject(new ResponseError('Failed to authenticate token.', 500));
      }
      resolve(decoded);
    });
  });
  return promise;
};

module.exports.getDecodedToken = getDecodedToken;
module.exports.getTokenUserId = getTokenUserId;
