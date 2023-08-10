/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const hashPassword = require('../middlewares/hashPassword');
const authentication = require('../middlewares/authentication');
const { userProfileAuthorization } = require('../middlewares/authorization');
// const { validateUser } = require('../middlewares/validations/userValidation');

// Contrôleur
const UserController = require('../controllers/UserController');
const UserProfileController = require('../controllers/UserProfileController');

// ******************************* CRUD Users *****************************************
// CREATE
router.post(
  '/',
  trimmer,
  // validateUser,
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
  userProfileAuthorization,
  trimmer,
  // validateUser,
  sanitizer,
  hashPassword,
  UserController.updateUser
);

// DELETE
router.delete('/:id', authentication, userProfileAuthorization, UserController.deleteUser);

// ******************************* CRUD User Profiles *****************************************
// CREATE
router.post('/:id/skills/', trimmer, sanitizer, UserProfileController.addUserSkill);
router.post('/:id/social-networks/', trimmer, sanitizer, UserProfileController.addUserSocialNetwork);
router.post('/:id/favorite-publications/', trimmer, sanitizer, UserProfileController.addUserFavoritePublication);

// READ
router.get('/:id/skills/', UserProfileController.getUserSkills);
router.get('/:id/social-networks/', UserProfileController.getUserSocialNetworks);
router.get('/:id/favorite-publications/', UserProfileController.getUserFavoritePublications);

// UPDATE
router.put('/:id/social-networks/', UserProfileController.updateUserSocialNetwork);

// DELETE
router.delete('/:id/skills/', authentication, userProfileAuthorization, UserProfileController.removeUserSkill);
router.delete('/:id/social-networks/', authentication, userProfileAuthorization, UserProfileController.removeUserSocialNetwork);
router.delete('/:id/favorite-publications/', authentication, userProfileAuthorization, UserProfileController.removeUserFavoritePublication);

module.exports = router;
