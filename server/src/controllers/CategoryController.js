const Category = require('../models/Category');

class CategoryController {
  async createCategory(req, res) {
    try {
      const checkTitleUnicity = await Category.findByTitle(req.body.title);
      if (checkTitleUnicity) {
        return res.status(401).json({ message: 'Titre déjà existant' });
      }

      await Category.create(req.body);
      return res.status(201).json({ message: 'Catégorie créée' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      if (categories) {
        res.status(200).json(categories);
      } else {
        res.status(404).json({ message: 'Aucune catégorie existante.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getCategoryById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const category = await Category.findById(id);
        if (category) {
          res.status(200).json(category);
        } else {
          res.status(404).json({ message: `Catégorie #${id} inexistante` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateCategory(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const checkTitleUnicity = await Category.findByTitle(req.body.title);
        if (checkTitleUnicity) {
          return res.status(401).json({ message: 'Titre déjà existant' });
        }

        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
          return res.status(404).json({ message: `Catégorie #${id} inexistante` });
        } else {
          await Category.update(id, req.body);

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

  async deleteCategory(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const category = await Category.findById(id);
        if (category) {
          await Category.remove(id);
          res.status(200).json({ message: `Catégorie #${id} supprimée` });
        } else {
          res.status(404).json({ message: `Catégorie #${id} inexistante` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getPublications(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
          return res.status(404).json({ message: `Catégorie #${id} inexistante` });
        } else {
          const publications = await Category.getPublications(id);

          return res.status(200).json(publications);
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

module.exports = new CategoryController();
