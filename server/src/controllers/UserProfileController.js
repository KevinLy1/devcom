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
            return res.status(401).json({ message: `Skill already owned by user #${idUser}` });
          // Vérifier pour l'erreur TypeError: Do not know how to serialize a BigInt mais l'insertion fonctionne

          const userSkill = await User.addSkill({ id_user: idUser, ...req.body });
          return res.status(201).json(userSkill);
        } else {
          res.status(404).json({ message: `User #${idUser} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
          res.status(404).json({ message: `No skills found for user #${idUser}` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async removeUserSkill(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          await User.removeSkill(idUser, req.body.id_skill);
          res.status(200).json({ message: `Skill deleted` });
        } else {
          res.status(404).json({ message: `User #${idUser} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
            return res
              .status(401)
              .json({ message: `Social network already assigned by user #${idUser}` });

          const userSocialNetwork = await User.addSocialNetwork({ id_user: idUser, ...req.body });
          return res.status(201).json(userSocialNetwork);
        } else {
          res.status(404).json({ message: `User #${idUser} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
          res.status(404).json({ message: `No social networks found for user #${idUser}` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateUserSocialNetwork(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const existingUser = await User.findById(idUser);

        if (!existingUser) {
          return res.status(404).json({ message: `User #${idUser} not found` });
        } else {
          const checkSocialNetworkExistence = await User.checkSocialNetworkExistence(
            idUser,
            req.body.id_social_network
          );
          if (checkSocialNetworkExistence)
            return res
              .status(401)
              .json({ message: `Social network already assigned by user #${idUser}` });

          await User.updateSocialNetwork(idUser, req.body.id_social_network);
          return res.status(200).json({ message: 'Update successful' });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async removeUserSocialNetwork(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          await User.removeSocialNetwork(idUser, req.body.id_social_network);
          res.status(200).json({ message: `Social network deleted` });
        } else {
          res.status(404).json({ message: `User #${idUser} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
            return res
              .status(401)
              .json({ message: `Publication already in favorites of user #${idUser}` });

          const userFavoritePublication = await User.addFavoritePublication({
            id_user: idUser,
            ...req.body
          });
          return res.status(201).json(userFavoritePublication);
        } else {
          res.status(404).json({ message: `User #${idUser} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
          res.status(404).json({ message: `No favorite publications found for user #${idUser}` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async removeUserFavoritePublication(req, res) {
    try {
      const idUser = req.params.id;

      if (!isNaN(idUser)) {
        const user = await User.findById(idUser);
        if (user) {
          await User.removeFavoritePublication(idUser, req.body.id_publication);
          res.status(200).json({ message: `Favorite publication deleted` });
        } else {
          res.status(404).json({ message: `User #${idUser} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

module.exports = new UserProfileController();
