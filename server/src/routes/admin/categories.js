/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../../middlewares/trimmer');
const sanitizer = require('../../middlewares/sanitizer');
const authentication = require('../../middlewares/authentication');
const { adminAuthorization } = require('../../middlewares/authorization');

// Contrôleur
const CategoryController = require('../../controllers/CategoryController');

// ******************************* CRUD Categories ************************************
// CREATE
router.post('/', authentication, adminAuthorization, trimmer, sanitizer, CategoryController.createCategory);

// READ
router.get('/', authentication, adminAuthorization, CategoryController.getCategories);
router.get('/:id', authentication, adminAuthorization, CategoryController.getCategoryById);

// UPDATE
router.put('/:id', authentication, adminAuthorization, trimmer, sanitizer, CategoryController.updateCategory);

// DELETE
router.delete('/:id', authentication, adminAuthorization, CategoryController.deleteCategory);

module.exports = router;
