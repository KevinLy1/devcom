const SocialNetwork = require('../models/SocialNetwork');

class SocialNetworkController {
  async createSocialNetwork(req, res) {
    try {
      const checkTitleUnicity = await SocialNetwork.findByTitle(req.body.title);
      if (checkTitleUnicity) {
        return res.status(401).json({ message: 'Titre déjà existant' });
      }

      await SocialNetwork.create(req.body);
      return res.status(201).json({ message: 'Réseau social créé' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getSocialNetworks(req, res) {
    try {
      const socialNetworks = await SocialNetwork.findAll();
      if (socialNetworks) {
        res.status(200).json(socialNetworks);
      } else {
        res.status(404).json({ message: 'Aucun réseau social trouvé' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getSocialNetworkById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const socialNetwork = await SocialNetwork.findById(id);
        if (socialNetwork) {
          res.status(200).json(socialNetwork);
        } else {
          res.status(404).json({ message: `Réseau social #${id} supprimé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateSocialNetwork(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const checkTitleUnicity = await SocialNetwork.findByTitle(req.body.title);
        if (checkTitleUnicity) {
          return res.status(401).json({ message: 'Titre déjà existant' });
        }

        const existingSocialNetwork = await SocialNetwork.findById(id);

        if (!existingSocialNetwork) {
          return res.status(404).json({ message: `Réseau social #${id} non trouvé` });
        } else {
          await SocialNetwork.update(id, req.body);

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

  async deleteSocialNetwork(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const socialNetwork = await SocialNetwork.findById(id);
        if (socialNetwork) {
          await SocialNetwork.remove(id);
          res.status(200).json({ message: `Réseau social #${id} supprimé` });
        } else {
          res.status(404).json({ message: `Réseau social #${id} non trouvé` });
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

module.exports = new SocialNetworkController();
