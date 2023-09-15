/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const { authorAuthorization } = require('../middlewares/authorization');
// const validation

// Contrôleur
const PublicationController = require('../controllers/PublicationController');

// Routes
// *************************************** Publications ***************************************
// CREATE
router.post('/', authentication, trimmer, sanitizer, PublicationController.createPublication);

// READ
router.get('/', PublicationController.getPublications);
router.get('/articles/latest', PublicationController.getLatestArticles);
router.get('/discussions/latest', PublicationController.getLatestDiscussions);
router.get('/:id', PublicationController.getPublicationById);

// UPDATE
router.put('/:id', authentication, authorAuthorization, trimmer, sanitizer, PublicationController.updatePublication);

// DELETE
router.delete('/:id', authentication, authorAuthorization, PublicationController.deletePublication);

// *************************************** Publication Categories ***************************************
// CREATE
router.post('/:id/categories', authentication, authorAuthorization, trimmer, sanitizer, PublicationController.addPublicationCategory);

// READ
router.get('/:id/categories', PublicationController.getPublicationCategories);

// DELETE
router.delete('/:id/categories', authentication, authorAuthorization, PublicationController.removePublicationCategory);

// *************************************** Publication Reputation ***************************************
// CREATE
router.post('/:id/reputation', authentication, trimmer, sanitizer, PublicationController.addPublicationReputation);

// READ
router.get('/:id/reputation', PublicationController.getPublicationReputations);

// DELETE
router.delete('/:id/reputation', authentication, PublicationController.removePublicationReputation);

// *************************************** Publication comments ***************************************
// READ
router.get('/:id/comments', PublicationController.getPublicationComments);

module.exports = router;
