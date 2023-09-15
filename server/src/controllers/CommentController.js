const Comment = require('../models/Comment');

class CommentController {
  async createComment(req, res) {
    try {
      await Comment.create(req.body);
      return res.status(201).json({ message: 'Commentaire ajouté' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getComments(req, res) {
    try {
      const comments = await Comment.findAll();
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'Aucun commentaire' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
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
          res.status(404).json({ message: `Commentaire #${id} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateComment(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const existingComment = await Comment.findById(id);

        if (!existingComment) {
          return res.status(404).json({ message: `Commentaire #${id} non trouvé` });
        } else {
          await Comment.update(id, req.body);

          return res.status(200).json({ message: 'Mise à jour réussie' });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
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
          res.status(404).json({ message: `Commentaire #${id} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
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
            return res.status(401).json({ message: 'Réputation déjà existante' });

          const commentReputation = await Comment.createCommentReputation({
            id_comment: idComment,
            ...req.body
          });
          return res.status(201).json(commentReputation);
        } else {
          res.status(404).json({ message: `Commentaire #${idComment} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
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
          res.status(404).json({ message: `Aucune réputation pour le commentaire #${idComment}` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateCommentReputation(req, res) {
    try {
      const idComment = req.params.id;

      if (!isNaN(idComment)) {
        const existingComment = await Comment.findById(idComment);

        if (!existingComment) {
          return res.status(404).json({ message: `Commentaire #${idComment} non trouvé` });
        } else {
          const checkReputation = await Comment.checkReputation(req.body.id_user, idComment);
          if (checkReputation)
            return res.status(401).json({ message: 'Réputation déjà existante' });

          await Comment.updateCommentReputation(req.body.id_user, idComment);
          return res.status(200).json({ message: 'Mise à jour réussie' });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async removeCommentReputation(req, res) {
    try {
      const idComment = req.params.id;

      if (!isNaN(idComment)) {
        const existingComment = await Comment.de(req.body.id_user, idComment);
        if (existingComment) {
          await Comment.deleteCommentReputation(idComment, req.body.id_comment);
          res.status(200).json({ message: `Réputation supprimée` });
        } else {
          res.status(404).json({ message: `Commentaire #${idComment} non trouvé` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }
}

module.exports = new CommentController();
