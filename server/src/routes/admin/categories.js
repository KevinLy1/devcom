/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../../middlewares/trimmer');
const sanitizer = require('../../middlewares/sanitizer');
const authentication = require('../../middlewares/authentication');
const { adminAuthorization } = require('../../middlewares/authorization');
// const validation

// Contrôleur
const AdminController = require('../../controllers/AdminController');

// ******************************* CRUD Categories ************************************
// CREATE
router.post('/categories', authentication, adminAuthorization, trimmer, sanitizer, AdminController.createCategory);

// READ
router.get('/categories', authentication, adminAuthorization, AdminController.getCategories);
router.get('/categories/:id', authentication, adminAuthorization, AdminController.getCategoryById);

// UPDATE
router.put('/categories/:id', authentication, adminAuthorization, trimmer, sanitizer, AdminController.updateCategory);

// DELETE
router.delete('/categories/:id', authentication, adminAuthorization, AdminController.deleteCategory);

module.exports = router;
