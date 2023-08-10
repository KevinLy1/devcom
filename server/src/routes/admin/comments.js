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
const CommentController = require('../../controllers/CommentController');

// Routes
// *************************************** Comments ***************************************
// CREATE
router.post('/', authentication, adminAuthorization, trimmer, sanitizer, CommentController.create);

// READ
router.get('/', authentication, adminAuthorization, CommentController.getComments);
router.get('/:id', authentication, adminAuthorization, CommentController.getCommentById);

// UPDATE
router.get('/:id', authentication, adminAuthorization, trimmer, sanitizer, CommentController.updateComment);

// DELETE
router.delete('/:id', authentication, adminAuthorization, CommentController.deleteComment);

// *************************************** Comment Reputation ***************************************
// CREATE
router.post('/:id/reputation', authentication, adminAuthorization, trimmer, sanitizer, CommentController.addCommentReputation);

// READ
router.get('/:id/reputation', authentication, adminAuthorization, CommentController.getCommentReputations);

// DELETE
router.delete('/:id/reputation', authentication, adminAuthorization, CommentController.removeCommentReputation);


module.exports = router;
