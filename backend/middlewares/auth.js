const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Autorização necessária' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  const { JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: 'Autorização necessária' });
  }

  req.user = payload;

  return next();
};
