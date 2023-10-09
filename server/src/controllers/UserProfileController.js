const User = require('../models/User');

class UserProfileController {
  // ********************************************* CRUD Profile *********************************************

  async addUserSkill(req, res) {
    try {
      const idUser = parseInt(req.params.id);

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          const checkSkillExistence = await User.checkSkillExistence(idUser, req.body.id_skill);
          if (checkSkillExistence)
            return res.status(401).json({ message: `Compétence déjà existante pour l'utilisateur #${idUser}` });

          const userSkill = await User.addSkill({ id_user: idUser, ...req.body });
          return res.status(201).json(userSkill);
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

  async getUserSkills(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const userSkills = await User.getSkills(idUser);
        if (userSkills) {
          res.status(200).json(userSkills);
        } else {
          res.status(404).json({ message: `Aucune compétence pour l'utilisateur #${idUser}` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async removeUserSkill(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          await User.removeSkill(idUser, req.body.id_skill);
          res.status(200).json({ message: `Compétence supprimée` });
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

  async addUserSocialNetwork(req, res) {
    try {
      const idUser = parseInt(req.params.id);

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          const checkSocialNetworkExistence = await User.checkSocialNetworkExistence(
            idUser,
            req.body.id_social_network
          );
          if (checkSocialNetworkExistence)
            return res.status(401).json({ message: `Réseau social déjà ajouté pour l'utilisateur #${idUser}` });

          const userSocialNetwork = await User.addSocialNetwork({ id_user: idUser, ...req.body });
          return res.status(201).json(userSocialNetwork);
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

  async getUserSocialNetworks(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const userSocialNetworks = await User.getSocialNetworks(idUser);
        if (userSocialNetworks) {
          res.status(200).json(userSocialNetworks);
        } else {
          res.status(404).json({ message: `Aucun réseau social pour l'utilisateur #${idUser}` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateUserSocialNetwork(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const existingUser = await User.findById(idUser);

        if (!existingUser) {
          return res.status(404).json({ message: `Utilisateur #${idUser} non trouvé` });
        } else {
          const checkSocialNetworkExistence = await User.checkSocialNetworkExistence(
            idUser,
            req.body.id_social_network
          );
          if (checkSocialNetworkExistence)
            return res.status(401).json({ message: `Réseau social déjà ajouté par l'utilisateur #${idUser}` });

          await User.updateSocialNetwork(idUser, req.body.id_social_network);
          return res.status(200).json({ message: 'Mise à jour réussie' });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async removeUserSocialNetwork(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          await User.removeSocialNetwork(idUser, req.body.id_social_network);
          res.status(200).json({ message: `Réseau social supprimé` });
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
