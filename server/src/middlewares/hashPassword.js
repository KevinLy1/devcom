require('dotenv').config();
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const hashPassword = (req, res, next) => {
  const { password } = req.body;

  if (password) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur pendant le hachage du mot de passe' });
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur pendant le hachage du mot de passe' });
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
