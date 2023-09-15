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

const authorAuthorization = (req, res, next) => {
  if (req.user.id_user === res.id_user) {
    next();
  } else {
    res.status(403).json({ message: 'Accès interdit' });
  }
};

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
  authorAuthorization
};
