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
const SocialNetworkController = require('../../controllers/SocialNetworkController');

// CREATE
router.post('/', authentication, adminAuthorization, trimmer, sanitizer, SocialNetworkController.createSocialNetwork);

// READ
router.get('/', authentication, adminAuthorization, SocialNetworkController.getSocialNetworks);
router.get('/:id', authentication, adminAuthorization, SocialNetworkController.getSocialNetworkById);

// UPDATE
router.put('/:id', authentication, adminAuthorization, trimmer, sanitizer, SocialNetworkController.updateSocialNetwork);

// DELETE
router.delete('/:id', authentication, adminAuthorization, SocialNetworkController.deleteSocialNetwork);

module.exports = router;
