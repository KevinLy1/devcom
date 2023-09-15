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
const PublicationController = require('../../controllers/PublicationController');

// *************************************** Publications ***************************************
// CREATE
router.post('/', authentication, adminAuthorization, trimmer, sanitizer, PublicationController.createPublication);

// READ
router.get('/', authentication, adminAuthorization, PublicationController.getPublications);
router.get('/:id', authentication, adminAuthorization, PublicationController.getPublicationById);

// UPDATE
router.get('/:id', authentication, adminAuthorization, trimmer, sanitizer, PublicationController.updatePublication);

// DELETE
router.delete('/:id', authentication, adminAuthorization, PublicationController.deletePublication);

// *************************************** Publication Categories ***************************************
// CREATE
router.post('/:id/categories', authentication, adminAuthorization, trimmer, sanitizer, PublicationController.addPublicationCategory);

// READ
router.get('/:id/categories', authentication, adminAuthorization, PublicationController.getPublicationCategories);

// DELETE
router.delete('/:id/categories', authentication, adminAuthorization, PublicationController.removePublicationCategory);

// *************************************** Publication Reputation ***************************************
// CREATE
router.post('/:id/reputation', authentication, adminAuthorization, trimmer, sanitizer, PublicationController.addPublicationReputation);

// READ
router.get('/:id/reputation', authentication, adminAuthorization, PublicationController.getPublicationReputations);

// DELETE
router.delete('/:id/reputation', authentication, adminAuthorization, PublicationController.removePublicationReputation);

// *************************************** Publication comments ***************************************
// READ
router.get('/:id/comments', authentication, adminAuthorization, PublicationController.getPublicationComments);

module.exports = router;
