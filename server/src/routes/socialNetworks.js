// Router()
const router = require('express').Router();

// Contrôleur
const SocialNetworkController = require('../controllers/SocialNetworkController');

// Routes
// READ
router.get('/', SocialNetworkController.getSocialNetworks);
router.get('/:id', SocialNetworkController.getSocialNetworkById);
module.exports = router;
