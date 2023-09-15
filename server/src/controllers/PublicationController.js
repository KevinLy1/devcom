const Publication = require('../models/Publication');

BigInt.prototype.toJSON = function () {
  return this.toString();
};

class PublicationController {
  // ******************************************** CRUD Publications  ************************************************
  async createPublication(req, res) {
    try {
      const result = await Publication.create(req.body);
      const id_publication = result.insertId;
      return res
        .status(201)
        .json({ message: 'Publication ajoutée', id_publication: id_publication });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getPublications(req, res) {
    try {
      const publications = await Publication.findAll();
      if (publications) {
        res.status(200).json(publications);
      } else {
        res.status(404).json({ message: 'Aucune publication' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getLatestArticles(req, res) {
    try {
      const publications = await Publication.findLatestArticles();
      if (publications) {
        res.status(200).json(publications);
      } else {
        res.status(404).json({ message: 'Aucun article' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getLatestDiscussions(req, res) {
    try {
      const publications = await Publication.findLatestDiscussions();
      if (publications) {
        res.status(200).json(publications);
      } else {
        res.status(404).json({ message: 'Aucune question' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getPublicationById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const publication = await Publication.findById(id);
        if (publication) {
          res.status(200).json(publication);
        } else {
          res.status(404).json({ message: `Publication #${id} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updatePublication(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const existingPublication = await Publication.findById(id);

        if (!existingPublication) {
          return res.status(404).json({ message: `Publication #${id} non trouvée` });
        } else {
          await Publication.update(id, req.body);

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

  async deletePublication(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const publication = await Publication.findById(id);
        if (publication) {
          await Publication.remove(id);
          res.status(200).json({ message: `Publication #${id} supprimée` });
        } else {
          res.status(404).json({ message: `Publication #${id} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  // ******************************************** CRUD Publication Categories ************************************************
  async addPublicationCategory(req, res) {
    try {
      const idPublication = parseInt(req.params.id);

      if (!isNaN(idPublication)) {
        const publication = await Publication.findById(idPublication);
        if (publication) {
          const checkCategoryExistence = await Publication.checkCategoryExistence(
            idPublication,
            req.body.id_category
          );
          if (checkCategoryExistence)
            return res.status(401).json({
              message: `Catégorie déjà assignée à la publication #${idPublication}`
            });

          const PublicationCategory = await Publication.addCategory({
            id_publication: idPublication,
            ...req.body
          });
          return res.status(201).json(PublicationCategory);
        } else {
          res.status(404).json({ message: `Publication #${idPublication} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getPublicationCategories(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const publicationCategories = await Publication.getCategories(idPublication);
        if (publicationCategories) {
          res.status(200).json(publicationCategories);
        } else {
          res
            .status(404)
            .json({ message: `Aucune catégorie pour la publication #${idPublication}` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async removePublicationCategory(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const publication = await Publication.findById(idPublication);
        if (publication) {
          await Publication.removeCategory(idPublication, req.body.id_category);
          res.status(200).json({ message: `Catégorie supprimée` });
        } else {
          res.status(404).json({ message: `Publication #${idPublication} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  // ******************************************** CRUD Publication Reputation  ************************************************
  async addPublicationReputation(req, res) {
    try {
      const idPublication = parseInt(req.params.id);

      if (!isNaN(idPublication)) {
        const publication = await Publication.findById(idPublication);
        if (publication) {
          const checkReputation = await Publication.checkReputation(
            req.body.id_user,
            idPublication
          );
          if (checkReputation)
            return res.status(401).json({
              message: `Réputation déjà existante sur la publication #${idPublication} par l'utilisateur #${req.body.id_user}`
            });

          const publicationReputation = await Publication.createPublicationReputation({
            id_publication: idPublication,
            ...req.body
          });
          return res.status(201).json(publicationReputation);
        } else {
          res.status(404).json({ message: `Publication #${idPublication} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getPublicationReputations(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const publicationReputations = await Publication.getTotalReputation(idPublication);
        if (publicationReputations) {
          res.status(200).json(publicationReputations);
        } else {
          res
            .status(404)
            .json({ message: `Aucune réputation pour la publication #${idPublication}` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updatePublicationReputation(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const existingPublication = await Publication.findById(idPublication);

        if (!existingPublication) {
          return res.status(404).json({ message: `Publication #${idPublication} non trouvée` });
        } else {
          const checkReputation = await Publication.checkReputation(
            req.body.id_user,
            idPublication
          );
          if (checkReputation) {
            await Publication.updatePublicationReputation(req.body.id_user, idPublication, {
              reputation_value: req.body.reputation_value
            });
            return res.status(200).json({ message: 'Mise à jour réussie' });
          }
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async removePublicationReputation(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const existingPublication = await Publication.findById(idPublication);
        if (existingPublication) {
          await Publication.deletePublicationReputation(req.body.id_user, idPublication);
          res.status(200).json({ message: `Réputation supprimée` });
        } else {
          res.status(404).json({ message: `Publication #${idPublication} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  // ******************************************** Publication comments  ************************************************

  async getPublicationComments(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const publicationComments = await Publication.getComments(idPublication);
        if (publicationComments) {
          res.status(200).json(publicationComments);
        } else {
          res
            .status(404)
            .json({ message: `Aucun commentaire pour la publication #${idPublication}` });
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

module.exports = new PublicationController();
