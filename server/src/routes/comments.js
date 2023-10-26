/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const validation = require('../middlewares/validation');
const { authorCommentAuthorization } = require('../middlewares/authorization');

// Contrôleur
const CommentController = require('../controllers/CommentController');

// Routes
// CREATE
router.post('/', authentication, trimmer, sanitizer, validation.validateComment, CommentController.createComment);

// READ
router.get('/', CommentController.getComments);
router.get('/:id', CommentController.getCommentById);
router.get('/:id/replies', CommentController.getReplies);

// UPDATE
router.put('/:id', authentication, authorCommentAuthorization, trimmer, sanitizer, validation.validateComment, CommentController.updateComment);

// DELETE
router.delete('/:id', authentication, authorCommentAuthorization, CommentController.deleteComment);

module.exports = router;
