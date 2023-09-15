const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

const User = require('../models/User');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

class UserController {
  async createUser(req, res) {
    try {
      const checkUsernameUnicity = await User.findByUsername(req.body.username);
      if (checkUsernameUnicity)
        return res.status(401).json({ message: "Nom d'utilisateur déjà existant" });

      const checkEmailUnicity = await User.findByEmail(req.body.email);
      if (checkEmailUnicity)
        return res.status(401).json({ message: 'Adresse e-mail déjà existante' });

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

  async uploadAvatar(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: `Utilisateur #${id} non trouvé` });
        }

        const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            const avatarDirectory = path.join(__dirname, '..', '..', 'uploads', 'avatar'); // Chemin du dossier d'avatar
            fs.mkdir(avatarDirectory, { recursive: true }, (err) => {
              if (err) {
                return cb(err, null);
              }
              cb(null, avatarDirectory);
            });
          },
          filename: function (req, file, cb) {
            const uniqueFileName = `${id}-${Date.now()}${path.extname(file.originalname)}`;
            cb(null, uniqueFileName);
          }
        });

        const upload = multer({ storage }).single('avatar');

        upload(req, res, async function (err) {
          if (err) {
            return res.status(500).json({ message: "Erreur lors du chargement de l'avatar" });
          }

          const avatarPath = req.file ? req.file.filename : null;
          if (avatarPath) {
            // Mettez à jour le nom de fichier de l'avatar dans la base de données
            await User.update(id, { avatar: avatarPath });

            return res.status(200).json({ message: 'Avatar mis à jour avec succès' });
          }

          return res.status(400).json({ message: "Aucun fichier d'avatar sélectionné" });
        });
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async deleteAvatar(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: `Utilisateur #${id} non trouvé` });
        }

        // Vérifiez si l'utilisateur a un avatar
        if (!user.avatar) {
          return res.status(400).json({ message: "L'utilisateur n'a pas d'avatar" });
        }

        // Supprimez le fichier d'avatar du système de fichiers
        const avatarPath = path.join(__dirname, '..', '..', 'uploads', 'avatar', user.avatar);
        fs.unlinkSync(avatarPath);

        // Mettez à jour l'utilisateur pour supprimer le lien vers l'avatar
        await User.update(id, { avatar: null });

        return res.status(200).json({ message: 'Avatar supprimé avec succès' });
      } else {
        return res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }
}

module.exports = new UserController();
