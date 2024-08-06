// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
}

module.exports = authenticate;
