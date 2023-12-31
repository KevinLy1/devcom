/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const { authorPublicationAuthorization } = require('../middlewares/authorization');
const validation = require('../middlewares/validation');

// Contrôleur
const PublicationController = require('../controllers/PublicationController');

// Routes
// *************************************** Publications ***************************************
// CREATE
router.post('/', authentication, trimmer, sanitizer, validation.validatePublication, PublicationController.createPublication);

// READ
router.get('/', PublicationController.getPublications);
router.get('/articles/latest', PublicationController.getLatestArticles);
router.get('/discussions/latest', PublicationController.getLatestDiscussions);
router.get('/:id', PublicationController.getPublicationById);

// UPDATE
router.put('/:id', authentication, authorPublicationAuthorization, trimmer, sanitizer, validation.validatePublication, PublicationController.updatePublication);

// DELETE
router.delete('/:id', authentication, authorPublicationAuthorization, PublicationController.deletePublication);

// *************************************** Publication Categories ***************************************
// CREATE
router.post('/:id/categories', authentication, authorPublicationAuthorization, trimmer, sanitizer, PublicationController.addPublicationCategory);

// READ
router.get('/:id/categories', PublicationController.getPublicationCategories);

// DELETE
router.delete('/:id/categories', authentication, authorPublicationAuthorization, PublicationController.removePublicationCategory);

// *************************************** Publication Reputation ***************************************
// CREATE
router.post('/:id/reputation', authentication, trimmer, sanitizer, PublicationController.addPublicationReputation);

// READ
router.get('/:id/reputation', PublicationController.getPublicationReputations);

// UPDATE
router.put('/:id/reputation', authentication, trimmer, sanitizer, PublicationController.updatePublicationReputation);

// DELETE
router.delete('/:id/reputation', authentication, PublicationController.removePublicationReputation);

// *************************************** Publication comments ***************************************
// READ
router.get('/:id/comments', PublicationController.getPublicationComments);

module.exports = router;
