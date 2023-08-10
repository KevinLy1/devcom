/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const { userAuthorization } = require('../middlewares/authorization');
// const validation

// Contrôleur
const PublicationController = require('../controllers/PublicationController');

// Routes
// *************************************** Publications ***************************************
// CREATE
router.post('/', authentication, trimmer, sanitizer, PublicationController.createPublication);

// READ
router.get('/', PublicationController.getPublications);
router.get('/:id', PublicationController.getPublicationById);

// UPDATE
router.get('/:id', authentication, userAuthorization, trimmer, sanitizer, PublicationController.updatePublication);

// DELETE
router.delete('/:id', authentication, userAuthorization, PublicationController.deletePublication);

// *************************************** Publication Categories ***************************************
// CREATE
router.post(':id/categories', authentication, userAuthorization, trimmer, sanitizer, PublicationController.addPublicationCategory);

// READ
router.get(':id/categories', PublicationController.getPublicationCategories);

// DELETE
router.delete(':id/categories', authentication, userAuthorization, PublicationController.removePublicationCategory);

module.exports = router;
