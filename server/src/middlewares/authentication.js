require('dotenv').config();
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: 'Accès non autorisé' });
  }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = data;

    return next();
  } catch {
    res.status(401).json({ message: 'Accès non autorisé' });
  }
};

module.exports = authentication;
