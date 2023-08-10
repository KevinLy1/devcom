const Publication = require('../models/Publication');

class PublicationController {
  // ******************************************** CRUD Publications  ************************************************
  async createPublication(req, res) {
    try {
      await Publication.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getPublications(req, res) {
    try {
      const publications = await Publication.findAll();
      if (publications) {
        res.status(200).json(publications);
      } else {
        res.status(404).json({ message: 'No publications found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
          res.status(404).json({ message: `Publication #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updatePublication(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const existingPublication = await Publication.findById(id);

        if (!existingPublication) {
          return res.status(404).json({ message: `Publication #${id} not found` });
        } else {
          await Publication.update(id, req.body);

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

  async deletePublication(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const publication = await Publication.findById(id);
        if (publication) {
          await Publication.remove(id);
          res.status(200).json({ message: `Publication #${id} deleted` });
        } else {
          res.status(404).json({ message: `Publication #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
              message: `Category already assigned on publication #${idPublication}`
            });

          const PublicationCategory = await Publication.addCategory({
            id_publication: idPublication,
            ...req.body
          });
          return res.status(201).json(PublicationCategory);
        } else {
          res.status(404).json({ message: `Publication #${idPublication} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
            .json({ message: `No categories found for publication #${idPublication}` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async removePublicationCategory(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const publication = await Publication.findById(idPublication);
        if (publication) {
          await Publication.removeCategory(idPublication, req.body.id_publication);
          res.status(200).json({ message: `Favorite publication deleted` });
        } else {
          res.status(404).json({ message: `Publication #${idPublication} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
              message: `Reputation already set on publication #${idPublication} by user #${req.body.id_user}`
            });

          const publicationReputation = await Publication.createPublicationReputation({
            id_publication: idPublication,
            ...req.body
          });
          return res.status(201).json(publicationReputation);
        } else {
          res.status(404).json({ message: `Publication #${idPublication} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
          res.status(404).json({ message: `No reputation for publication #${idPublication}` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updatePublicationReputation(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const existingPublication = await Publication.findById(idPublication);

        if (!existingPublication) {
          return res.status(404).json({ message: `Publication #${idPublication} not found` });
        } else {
          const checkReputation = await Publication.checkReputation(
            req.body.id_user,
            idPublication
          );
          if (checkReputation)
            return res.status(401).json({
              message: `Reputation already set on publication #${idPublication} by user #${req.body.id_user}`
            });

          await Publication.updatePublicationReputation(req.body.id_user, idPublication);
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

  async removePublicationReputation(req, res) {
    try {
      const idPublication = req.params.id;

      if (!isNaN(idPublication)) {
        const existingPublication = await Publication.deletePublicationReputation(
          req.body.id_user,
          idPublication
        );
        if (existingPublication) {
          await Publication.removeCategory(idPublication, req.body.id_publication);
          res.status(200).json({ message: `Reputation deleted` });
        } else {
          res.status(404).json({ message: `Publication #${idPublication} not found` });
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

module.exports = new PublicationController();
