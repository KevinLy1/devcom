/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../../middlewares/trimmer');
const sanitizer = require('../../middlewares/sanitizer');
const hashPassword = require('../../middlewares/hashPassword');
const authentication = require('../../middlewares/authentication');
const { adminAuthorization } = require('../../middlewares/authorization');
// const { validateUser } = require('../middlewares/validations/userValidation');

// Contrôleur
const UserController = require('../../controllers/UserController');
const UserProfileController = require('../../controllers/UserProfileController');

// ******************************* CRUD Users *****************************************
// CREATE
router.post(
'/',
authentication,
adminAuthorization,
trimmer,
// validateUser,
sanitizer,
hashPassword,
UserController.createUser
);

// READ
router.get('/', authentication, adminAuthorization, UserController.getUsers);
router.get('/:id', authentication, adminAuthorization, UserController.getUserById);

// UPDATE
router.put(
  '/:id',
  authentication,
  adminAuthorization,
  trimmer,
  // validateUser,
  sanitizer,
  hashPassword,
  UserController.updateUser
);

// DELETE
router.delete('/:id', authentication, adminAuthorization, UserController.deleteUser);

// ******************************* CRUD User Profiles *****************************************
// CREATE
router.post('/:id/skills/', authentication, adminAuthorization, trimmer, sanitizer, UserProfileController.addUserSkill);
router.post('/:id/social-networks/', authentication, adminAuthorization, trimmer, sanitizer, UserProfileController.addUserSocialNetwork);
router.post('/:id/favorite-publications/', authentication, adminAuthorization, trimmer,sanitizer, UserProfileController.addUserFavoritePublication);

// READ
router.get('/:id/skills/', authentication, adminAuthorization, UserProfileController.getUserSkills);
router.get('/:id/social-networks/', authentication, adminAuthorization, UserProfileController.getUserSocialNetworks);
router.get('/:id/favorite-publications/', authentication, adminAuthorization, UserProfileController.getUserFavoritePublications);

// UPDATE
router.put('/:id/social-networks/', authentication, adminAuthorization, UserProfileController.updateUserSocialNetwork);

// DELETE
router.delete('/:id/skills/', authentication, adminAuthorization, UserProfileController.removeUserSkill);
router.delete('/:id/social-networks/', authentication, adminAuthorization, UserProfileController.removeUserSocialNetwork);
router.delete('/:id/favorite-publications/', authentication, adminAuthorization, UserProfileController.removeUserFavoritePublication);

module.exports = router;
