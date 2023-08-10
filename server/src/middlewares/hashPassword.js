require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  if (password) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: 'Error occured during password hash.' });
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: 'Error occured during password hash.' });
        }

        req.body.password = hash;

        next();
      });
    });
  } else {
    next();
  }
};

module.exports = hashPassword;
