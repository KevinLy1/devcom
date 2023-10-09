const validator = require('validator');

class Validation {
  constructor() {
    this.validateUser = this.validateUser.bind(this);
  }

  async validateUser(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const gender = req.body.gender;
      const firstName = req.body.first_name;
      const lastName = req.body.last_name;
      const web_url = req.body.web_url;
      const avatar = req.body.avatar;
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
      if (firstName && !validator.isAlpha(firstName) && !validator.isLength(firstName, { min: 2 })) {
        throw new Error('Le prénom ne doit comporter que des lettres et avoir une longueur minimale de 2 caractères');
      }

      // Valider le nom de famille (facultatif)
      if (lastName && !validator.isAlpha(lastName) && !validator.isLength(lastName, { min: 2 })) {
        throw new Error(
          'Le nom de famille ne doit comporter que des lettres et avoir une longueur minimale de 2 caractères'
        );
      }

      // Valider l'URL du site web (facultatif)
      if (web_url && !validator.isURL(web_url)) {
        throw new Error("L'URL du site web n'est pas valide");
      }

      // Valider l'URL de l'avatar (facultatif)
      if (avatar) {
        const validExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
        const lowerCaseAvatar = avatar.toLowerCase();
        if (!validExtensions.some((extension) => lowerCaseAvatar.endsWith(extension))) {
          throw new Error("L'avatar doit être une image au format JPG, JPEG, GIF, ou PNG");
        }
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
}

module.exports = new Validation();
