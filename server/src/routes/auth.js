// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');

// Contrôleur
const AuthController = require('../controllers/AuthController');

// Routes
router.post('/login', trimmer, sanitizer, AuthController.login);
router.get('/logout', authentication, AuthController.logout);
router.get('/protected', authentication, AuthController.getAccessTokenData);
router.get('/refresh', AuthController.refreshAccessToken);

module.exports = router;
