// Router()
const router = require('express').Router();

// Contrôleur
const CategoryController = require('../controllers/CategoryController');

// Routes
// READ
router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.get('/:id/publications', CategoryController.getPublications);

module.exports = router;
