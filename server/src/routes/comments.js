/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../middlewares/trimmer');
const sanitizer = require('../middlewares/sanitizer');
const authentication = require('../middlewares/authentication');
const { authorAuthorization } = require('../middlewares/authorization');
// const validation

// Contrôleur
const CommentController = require('../controllers/CommentController');

// Routes
// CREATE
router.post('/', authentication, trimmer, sanitizer, CommentController.createComment);

// READ
router.get('/', CommentController.getComments);
router.get('/:id', CommentController.getCommentById);

// UPDATE
router.get('/:id', authentication, authorAuthorization, trimmer, sanitizer, CommentController.updateComment);

// DELETE
router.delete('/:id', authentication, authorAuthorization, CommentController.deleteComment);

module.exports = router;
