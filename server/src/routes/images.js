/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const authentication = require('../middlewares/authentication');

// Contrôleur
const { ImageController, upload } = require('../controllers/ImageController');

// ******************************* CRUD Images *****************************************
// CREATE
router.post('/', authentication, upload.single('image'), ImageController.uploadImage);

// DELETE
router.delete('/:imageName', authentication, ImageController.deleteImage);

module.exports = router;