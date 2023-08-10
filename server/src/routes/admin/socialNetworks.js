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

// CREATE
router.post('/social-networks', authentication, adminAuthorization, trimmer, sanitizer, AdminController.createSocialNetwork);

// READ
router.get('/social-networks', authentication, adminAuthorization, AdminController.getSocialNetworks);
router.get('/social-networks/:id', authentication, adminAuthorization, AdminController.getSocialNetworkById);

// UPDATE
router.put('/social-networks/:id', authentication, adminAuthorization, trimmer, sanitizer, AdminController.updateSocialNetwork);

// DELETE
router.delete('/social-networks/:id', authentication, adminAuthorization, AdminController.deleteSocialNetwork);

module.exports = router;