/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const { authorCommentAuthorization } = require('../middlewares/authorization');

// Contrôleur
const CommentController = require('../controllers/CommentController');

// Routes
// CREATE
router.post('/', authentication, trimmer, sanitizer, CommentController.createComment);

// READ
router.get('/', CommentController.getComments);
router.get('/:id', CommentController.getCommentById);
router.get('/:id/replies', CommentController.getReplies);

// UPDATE
router.put('/:id', authentication, authorCommentAuthorization, trimmer, sanitizer, CommentController.updateComment);

// DELETE
router.delete('/:id', authentication, authorCommentAuthorization, CommentController.deleteComment);

module.exports = router;
