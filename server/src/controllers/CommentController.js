const Comment = require('../models/Comment');

class CommentController {
  async createComment(req, res) {
    try {
      await Comment.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getComments(req, res) {
    try {
      const comments = await Comment.findAll();
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'No comments found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const comment = await Comment.findById(id);
        if (comment) {
          res.status(200).json(comment);
        } else {
          res.status(404).json({ message: `Comment #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateComment(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const existingComment = await Comment.findById(id);

        if (!existingComment) {
          return res.status(404).json({ message: `Comment #${id} not found` });
        } else {
          await Comment.update(id, req.body);

          return res.status(200).json({ message: 'Update successful' });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async deleteComment(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const comment = await Comment.findById(id);
        if (comment) {
          await Comment.remove(id);
          res.status(200).json({ message: `Comment #${id} deleted` });
        } else {
          res.status(404).json({ message: `Comment #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  // ******************************************** CRUD Comment Reputation  ************************************************
  async addCommentReputation(req, res) {
    try {
      const idComment = parseInt(req.params.id);

      if (!isNaN(idComment)) {
        const comment = await Comment.findById(idComment);
        if (comment) {
          const checkReputation = await Comment.checkReputation(req.body.id_user, idComment);
          if (checkReputation)
            return res.status(401).json({
              message: `Reputation already set on comment #${idComment} by user #${req.body.id_user}`
            });

          const commentReputation = await Comment.createCommentReputation({
            id_comment: idComment,
            ...req.body
          });
          return res.status(201).json(commentReputation);
        } else {
          res.status(404).json({ message: `Comment #${idComment} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getCommentReputations(req, res) {
    try {
      const idComment = req.params.id;

      if (!isNaN(idComment)) {
        const commentReputations = await Comment.getTotalReputation(idComment);
        if (commentReputations) {
          res.status(200).json(commentReputations);
        } else {
          res.status(404).json({ message: `No reputation for comment #${idComment}` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateCommentReputation(req, res) {
    try {
      const idComment = req.params.id;

      if (!isNaN(idComment)) {
        const existingComment = await Comment.findById(idComment);

        if (!existingComment) {
          return res.status(404).json({ message: `Comment #${idComment} not found` });
        } else {
          const checkReputation = await Comment.checkReputation(req.body.id_user, idComment);
          if (checkReputation)
            return res.status(401).json({
              message: `Reputation already set on comment #${idComment} by user #${req.body.id_user}`
            });

          await Comment.updateCommentReputation(req.body.id_user, idComment);
          return res.status(200).json({ message: 'Update successful' });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async removeCommentReputation(req, res) {
    try {
      const idComment = req.params.id;

      if (!isNaN(idComment)) {
        const existingComment = await Comment.de(req.body.id_user, idComment);
        if (existingComment) {
          await Comment.deleteCommentReputation(idComment, req.body.id_comment);
          res.status(200).json({ message: `Reputation deleted` });
        } else {
          res.status(404).json({ message: `Comment #${idComment} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
}

module.exports = new CommentController();
