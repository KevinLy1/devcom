// /* eslint-disable prettier/prettier */
// // Router()
// const router = require('express').Router();

// // Middlewares
// const trimmer = require('../middlewares/trimmer');
// const sanitizer = require('../middlewares/sanitizer');
// const authentication = require('../middlewares/authentication');
// const { userAuthorization } = require('../middlewares/authorization');

// // Contrôleur
// const ImageController = require('../controllers/ImageController');

// // ******************************* CRUD User Avatars *****************************************
// router.post('/avatar', authentication, userAuthorization, trimmer, sanitizer, ImageController.uploadAvatar);
// router.delete('/avatar', authentication, userAuthorization, ImageController.deleteAvatar);
