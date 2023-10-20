const User = require('../models/User');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

class UserController {
  async createUser(req, res) {
    try {
      const checkUsernameUnicity = await User.findByUsername(req.body.username);
      if (checkUsernameUnicity) return res.status(401).json({ message: "Nom d'utilisateur déjà existant" });

      const checkEmailUnicity = await User.findByEmail(req.body.email);
      if (checkEmailUnicity) return res.status(401).json({ message: 'Adresse e-mail déjà existante' });

      const result = await User.create(req.body);
      const id_user = result.insertId;
      return res.status(201).json({ message: 'Utilisateur créé', id_user: id_user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'Aucun utilisateur trouvé' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const user = await User.findById(id);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: `Utilisateur #${id} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        if (req.body.username) {
          const checkUsernameUnicity = await User.findByUsername(req.body.username);
          if (checkUsernameUnicity) {
            return res.status(401).json({ message: "Nom d'utilisateur déjà existant" });
          }
        }

        if (req.body.email) {
          const checkEmailUnicity = await User.findByEmail(req.body.email);
          if (checkEmailUnicity) {
            return res.status(401).json({ message: 'Adresse e-mail déjà existante' });
          }
        }

        const existingUser = await User.findById(id);

        if (!existingUser) {
          return res.status(404).json({ message: `Utilisateur #${id} non trouvé` });
        } else {
          await User.update(id, req.body);

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

  async deleteUser(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const user = await User.findById(id);
        if (user) {
          await User.remove(id);
          res.status(200).json({ message: `Utilisateur #${id} supprimé` });
        } else {
          res.status(404).json({ message: `Utilisateur #${id} non trouvé` });
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

module.exports = new UserController();
