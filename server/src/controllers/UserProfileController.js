const User = require('../models/User');

class UserProfileController {
  async addUserFavoritePublication(req, res) {
    try {
      const idUser = parseInt(req.params.id);

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          const checkFavoritePublicationExistence = await User.checkFavoritePublicationExistence(
            idUser,
            req.body.id_publication
          );
          if (checkFavoritePublicationExistence)
            return res.status(401).json({ message: `Publication déjà dans les favoris de l'utilisateur #${idUser}` });

          const userFavoritePublication = await User.addFavoritePublication({
            id_user: idUser,
            ...req.body
          });
          return res.status(201).json(userFavoritePublication);
        } else {
          res.status(404).json({ message: `Utilisateur #${idUser} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getUserFavoritePublications(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const userFavoritePublications = await User.getFavoritePublications(idUser);
        if (userFavoritePublications) {
          res.status(200).json(userFavoritePublications);
        } else {
          res.status(404).json({ message: `Pas de publication favorite pour l'utilisateur #${idUser}` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async removeUserFavoritePublication(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          await User.removeFavoritePublication(idUser, req.body.id_publication);
          res.status(200).json({ message: `Favori supprimé` });
        } else {
          res.status(404).json({ message: `Utilisateur #${idUser} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }
}

module.exports = new UserProfileController();
