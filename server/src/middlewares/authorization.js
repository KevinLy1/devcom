const adminAuthorization = (req, res, next) => {
  if (req.user.role === 'administrator') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized access' });
  }
};

const userProfileAuthorization = (req, res, next) => {
  if (req.user.id_user === parseInt(req.params.id)) {
    if ('role' in req.body) {
      return res.status(403).json({ message: 'Not allowed to modify role' });
    }
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized access' });
  }
};

const userAuthorization = (req, res, next) => {
  if (req.user.id_user === parseInt(req.params.id)) {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized access' });
  }
};

module.exports = {
  adminAuthorization,
  userProfileAuthorization,
  userAuthorization
};
