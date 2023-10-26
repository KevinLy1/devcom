require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  async login(req, res) {
    try {
      const user = await User.findByUsername(req.body.username);
      if (!user) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      } else {
        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
          res.status(401).json({ message: 'Identifiants invalides' });
        } else {
          const accessToken = jwt.sign(
            {
              id_user: user.id_user,
              username: user.username,
              role: user.role
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: parseInt(process.env.JWT_EXPIRATION)
            }
          );

          const refreshToken = jwt.sign(
            {
              username: user.username
            },
            process.env.REFRESH_JWT_SECRET_KEY,
            {
              expiresIn: parseInt(process.env.REFRESH_JWT_EXPIRATION)
            }
          );

          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: parseInt(process.env.REFRESH_JWT_COOKIE_EXPIRATION)
          });

          return res
            .cookie('accessToken', accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'Strict',
              maxAge: parseInt(process.env.JWT_COOKIE_EXPIRATION)
            })
            .status(200)
            .json({
              message: 'Authentifié'
            });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async logout(req, res) {
    return res
      .clearCookie('refreshToken')
      .clearCookie('accessToken')
      .status(200)
      .json({ message: 'Déconnexion réussie' });
  }

  async getAccessTokenData(req, res) {
    return res.json({
      id_user: req.user.id_user,
      username: req.user.username,
      role: req.user.role
    });
  }

  async refreshAccessToken(req, res) {
    if (req.cookies?.refreshToken) {
      const refreshToken = req.cookies.refreshToken;

      try {
        const decodedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET_KEY);

        const user = await User.findByUsername(decodedRefreshToken.username);

        if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const accessToken = jwt.sign(
          {
            id_user: user.id_user,
            username: user.username,
            role: user.role
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: parseInt(process.env.JWT_EXPIRATION)
          }
        );

        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          maxAge: parseInt(process.env.JWT_COOKIE_EXPIRATION)
        });

        return res.status(200).json({ message: "Jeton d'accès rafraîchi" });
      } catch (error) {
        return res.status(400).json({ message: 'Mauvaise requête' });
      }
    } else {
      return res.status(401).json({ message: 'Non autorisé' });
    }
  }
}

module.exports = new AuthController();
