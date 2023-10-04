const Comment = require('../models/Comment');
const Publication = require('../models/Publication');

const adminAuthorization = (req, res, next) => {
  if (req.user.role === 'administrator') {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

const userRoleAuthorization = (req, res, next) => {
  if (req.user.id_user === parseInt(req.params.id)) {
    if ('role' in req.body) {
      return res.status(403).json({ message: 'Interdit de modifier le rôle' });
    }
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

const userAuthorization = (req, res, next) => {
  if (req.user.id_user === parseInt(req.params.id)) {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

const authorPublicationAuthorization = async (req, res, next) => {
  const idUser = req.user.id_user;
  const idPublication = req.params.id;

  try {
    const publication = await Publication.findById(idPublication);
    if (!publication) {
      res.status(404).json({ message: `Publication #${idPublication} non trouvée` });
      return;
    }

    if (publication.id_user === idUser) {
      next();
    } else {
      res.status(403).json({ message: 'Accès interdit' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur de serveur interne' });
  }
};

const authorCommentAuthorization = async (req, res, next) => {
  const idUser = req.user.id_user; // ID de l'utilisateur dans la requête
  const idComment = req.params.id; // ID de la ressource à supprimer, probablement extrait de l'URL

  try {
    const comment = await Comment.findById(idComment);
    if (!comment) {
      res.status(404).json({ message: `Commentaire #${idComment} non trouvé` });
      return;
    }

    // Vérifiez si l'utilisateur est l'auteur du commentaire
    if (comment.id_user === idUser) {
      // L'utilisateur est l'auteur, il est autorisé à effectuer les opérations comme UPDATE ou DELETE
      next();
    } else {
      // L'utilisateur n'est pas l'auteur, renvoyez une réponse 403 (Accès interdit)
      res.status(403).json({ message: 'Accès interdit' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur de serveur interne' });
  }
};

// const authorAuthorization = (req, res, next) => {
//   if (req.user.id_user === res.id_user) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Accès interdit' });
//   }
// };

// Peut-être transférer ce check dans VALIDATION USER ?
// const registrationCheck = (req, res, next) => {
//   if ('role' in req.body) {
//     return res.status(403).json({ message: 'Not allowed to modify role' });
//   }
//   next();
// };

module.exports = {
  adminAuthorization,
  userRoleAuthorization,
  userAuthorization,
  authorPublicationAuthorization,
  authorCommentAuthorization
};
