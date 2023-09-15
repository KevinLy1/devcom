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
  Validation.validateUser,
  sanitizer,
  hashPassword,
  UserController.createUser
);
router.post('/:id/avatar', authentication, userAuthorization, trimmer, sanitizer, UserController.uploadAvatar);

// READ
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);

// UPDATE
router.put(
  '/:id',
  authentication,
  userRoleAuthorization,
  trimmer,
  Validation.validateUser,
  sanitizer,
  hashPassword,
  UserController.updateUser
);

// DELETE
router.delete('/:id', authentication, userAuthorization, UserController.deleteUser);
router.delete('/:id/avatar', authentication, userAuthorization, UserController.deleteAvatar);

// ******************************* CRUD User Profiles *****************************************
// CREATE
router.post('/:id/skills/', authentication, userAuthorization, trimmer, sanitizer, UserProfileController.addUserSkill);
router.post('/:id/social-networks/', authentication, userAuthorization, trimmer, sanitizer, UserProfileController.addUserSocialNetwork);
router.post('/:id/favorite-publications/', authentication, userAuthorization, trimmer, sanitizer, UserProfileController.addUserFavoritePublication);

// READ
router.get('/:id/skills/', UserProfileController.getUserSkills);
router.get('/:id/social-networks/', UserProfileController.getUserSocialNetworks);
router.get('/:id/favorite-publications/', UserProfileController.getUserFavoritePublications);

// UPDATE
router.put('/:id/social-networks/', authentication, userAuthorization, UserProfileController.updateUserSocialNetwork);

// DELETE
router.delete('/:id/skills/', authentication, userAuthorization, UserProfileController.removeUserSkill);
router.delete('/:id/social-networks/', authentication, userAuthorization, UserProfileController.removeUserSocialNetwork);
router.delete('/:id/favorite-publications/', authentication, userAuthorization, UserProfileController.removeUserFavoritePublication);

module.exports = router;
