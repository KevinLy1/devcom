/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const { userAuthorization } = require('../middlewares/authorization');
// const validation

// Contrôleur
const CommentController = require('../controllers/CommentController');

// Routes
// *************************************** Comments ***************************************
// CREATE
router.post('/', authentication, trimmer, sanitizer, CommentController.createComment);

// READ
router.get('/', CommentController.getComments);
router.get('/:id', CommentController.getCommentById);

// UPDATE
router.get('/:id', authentication, userAuthorization, trimmer, sanitizer, CommentController.updateComment);

// DELETE
router.delete('/:id', authentication, userAuthorization, CommentController.deleteComment);

// *************************************** Comment Reputation ***************************************
// CREATE
router.post('/:id/reputation', authentication, userAuthorization, trimmer, sanitizer, CommentController.addCommentReputation);

// READ
router.get('/:id/reputation', CommentController.getCommentReputations);

// DELETE
router.delete('/:id/reputation', authentication, userAuthorization, CommentController.removeCommentReputation);

module.exports = router;
