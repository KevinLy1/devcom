/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../../middlewares/trimmer');
const sanitizer = require('../../middlewares/sanitizer');
const authentication = require('../../middlewares/authentication');
const { adminAuthorization } = require('../../middlewares/authorization');
const validation = require('../../middlewares/validation');

// Contrôleur
const PublicationController = require('../../controllers/PublicationController');

// *************************************** Publications ***************************************
// READ
router.get('/', authentication, adminAuthorization, PublicationController.getPublications);
router.get('/:id', authentication, adminAuthorization, PublicationController.getPublicationById);

// UPDATE
router.put('/:id', authentication, adminAuthorization, trimmer, sanitizer, validation.validatePublication, PublicationController.updatePublication);

// DELETE
router.delete('/:id', authentication, adminAuthorization, PublicationController.deletePublication);

// *************************************** Publication Categories ***************************************
// CREATE
router.post('/:id/categories', authentication, adminAuthorization, trimmer, sanitizer, PublicationController.addPublicationCategory);

// READ
router.get('/:id/categories', authentication, adminAuthorization, PublicationController.getPublicationCategories);

// DELETE
router.delete('/:id/categories', authentication, adminAuthorization, PublicationController.removePublicationCategory);

module.exports = router;
