/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const hashPassword = require('../middlewares/hashPassword');
const authentication = require('../middlewares/authentication');
const { userRoleAuthorization, userAuthorization } = require('../middlewares/authorization');
const Validation = require('../middlewares/validation');

// Contrôleur
const UserController = require('../controllers/UserController');
const UserProfileController = require('../controllers/UserProfileController');

// ******************************* CRUD Users *****************************************
// CREATE
router.post(
  '/',
  trimmer,
  Validation.validateUserRegistration,
  sanitizer,
  hashPassword,
  UserController.createUser
);

// READ
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);

// UPDATE
router.put(
  '/:id',
  authentication,
  userRoleAuthorization,
  trimmer,
  Validation.validateUserUpdate,
  sanitizer,
  hashPassword,
  UserController.updateUser
);

// DELETE
router.delete('/:id', authentication, userAuthorization, UserController.deleteUser);

// ******************************* CRUD User Favorite Publications *****************************************
// CREATE
router.post('/:id/favorite-publications/', authentication, userAuthorization, trimmer, sanitizer, UserProfileController.addUserFavoritePublication);

// READ
router.get('/:id/favorite-publications/', UserProfileController.getUserFavoritePublications);

// DELETE
router.delete('/:id/favorite-publications/', authentication, userAuthorization, UserProfileController.removeUserFavoritePublication);

module.exports = router;
