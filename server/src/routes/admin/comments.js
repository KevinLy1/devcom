/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../../middlewares/trimmer');
const sanitizer = require('../../middlewares/sanitizer');
const authentication = require('../../middlewares/authentication');
const validation = require('../../middlewares/validation');
const { adminAuthorization } = require('../../middlewares/authorization');
// const validation

// Contrôleur
const CommentController = require('../../controllers/CommentController');

// Routes
// READ
router.get('/', authentication, adminAuthorization, CommentController.getComments);
router.get('/:id', authentication, adminAuthorization, CommentController.getCommentById);

// UPDATE
router.put('/:id', authentication, adminAuthorization, trimmer, sanitizer, validation.validateComment, CommentController.updateComment);

// DELETE
router.delete('/:id', authentication, adminAuthorization, CommentController.deleteComment);

module.exports = router;
