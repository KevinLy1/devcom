const validator = require('validator');

class Validation {
  constructor() {
    this.validateUserRegistration = this.validateUserRegistration.bind(this);
    this.validateUserUpdate = this.validateUserUpdate.bind(this);
  }

  async validateUserRegistration(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const gender = req.body.gender;
      const firstName = req.body.first_name;
      const lastName = req.body.last_name;
      const web_url = req.body.web_url;
      const biography = req.body.biography;

      // Valider le nom d'utilisateur (obligatoire)
      if (!validator.isAlphanumeric(username) && !validator.isLength(username, { min: 3 })) {
        throw new Error(
          "Le nom d'utilisateur doit comporter uniquement des caractères alphanumériques et avoir une longueur minimale de 3 caractères"
        );
      }

      // Valider le mot de passe (obligatoire)
      if (!validator.isStrongPassword(password)) {
        throw new Error(
          'Le mot de passe doit comporter au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole'
        );
      }

      // Valider l'adresse e-mail (obligatoire)
      if (!validator.isEmail(email)) {
        throw new Error("L'adresse e-mail doit être au bon format (ex: exemple@domaine.com)");
      }

      // Valider la civilité (facultatif)
      if (gender && !['M', 'F', 'O'].includes(gender.toUpperCase())) {
        throw new Error('La civilité doit être homme, femme ou autre');
      }

      // Valider le prénom (facultatif)
      if (!validator.isEmpty(firstName, { ignore_whitespace: true })) {
        if (!validator.isAlpha(firstName)) {
          throw new Error('Le prénom ne doit comporter que des lettres');
        } else if (!validator.isLength(firstName, { min: 2 })) {
          throw new Error('Le prénom doit avoir une longueur minimale de 2 caractères');
        }
      }

      // Valider le nom de famille (facultatif)
      if (!validator.isEmpty(lastName, { ignore_whitespace: true })) {
        if (!validator.isAlpha(lastName)) {
          throw new Error('Le nom de famille ne doit comporter que des lettres');
        } else if (!validator.isLength(lastName, { min: 2 })) {
          throw new Error('Le nom de famille doit avoir une longueur minimale de 2 caractères');
        }
      }

      // Valider l'URL du site web (facultatif)
      if (web_url && !validator.isURL(web_url)) {
        throw new Error("L'URL du site web n'est pas valide");
      }

      // Valider la biographie (facultatif)
      if (biography && !validator.isLength(biography, { max: 200 })) {
        throw new Error('La biographie ne doit pas dépasser 200 caractères');
      }

      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async validateUserUpdate(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const gender = req.body.gender;
      const firstName = req.body.first_name;
      const lastName = req.body.last_name;
      const web_url = req.body.web_url;
      const biography = req.body.biography;

      // Valider le nom d'utilisateur
      if (username && !validator.isAlphanumeric(username) && !validator.isLength(username, { min: 3 })) {
        throw new Error(
          "Le nom d'utilisateur doit comporter uniquement des caractères alphanumériques et avoir une longueur minimale de 3 caractères"
        );
      }

      // Valider le mot de passe
      if (password && !validator.isStrongPassword(password)) {
        throw new Error(
          'Le mot de passe doit comporter au minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole'
        );
      }

      // Valider l'adresse e-mail
      if (email) {
        if (!validator.isEmail(email)) {
          throw new Error("L'adresse e-mail doit être au bon format (ex : exemple@domaine.com)");
        }
      } else {
        throw new Error("L'adresse e-mail ne peut pas être vide");
      }

      // Valider la civilité (facultatif)
      if (gender && !['M', 'F', 'O'].includes(gender.toUpperCase())) {
        throw new Error('La civilité doit être homme, femme ou autre');
      }

      // Valider le prénom
      if (firstName) {
        if (!validator.isEmpty(firstName, { ignore_whitespace: true })) {
          if (!validator.isAlpha(firstName)) {
            throw new Error('Le prénom ne doit comporter que des lettres');
          } else if (!validator.isLength(firstName, { min: 2 })) {
            throw new Error('Le prénom doit avoir une longueur minimale de 2 caractères');
          }
        }
      }

      // Valider le nom de famille
      if (lastName) {
        if (!validator.isEmpty(lastName, { ignore_whitespace: true })) {
          if (!validator.isAlpha(lastName)) {
            throw new Error('Le nom de famille ne doit comporter que des lettres');
          } else if (!validator.isLength(lastName, { min: 2 })) {
            throw new Error('Le nom de famille doit avoir une longueur minimale de 2 caractères');
          }
        }
      }

      // Valider l'URL du site web
      if (web_url && !validator.isURL(web_url)) {
        throw new Error("L'URL du site web n'est pas valide");
      }

      // Valider la biographie
      if (biography && !validator.isLength(biography, { max: 200 })) {
        throw new Error('La biographie ne doit pas dépasser 200 caractères');
      }

      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new Validation();
