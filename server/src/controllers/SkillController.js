const Skill = require('../models/Skill');

class SkillController {
  async createSkill(req, res) {
    try {
      const checkTitleUnicity = await Skill.findByTitle(req.body.title);
      if (checkTitleUnicity) {
        return res.status(401).json({ message: 'Titre déjà existant' });
      }

      await Skill.create(req.body);
      return res.status(201).json({ message: 'Compétence créée' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getSkills(req, res) {
    try {
      const skills = await Skill.findAll();
      if (skills) {
        res.status(200).json(skills);
      } else {
        res.status(404).json({ message: 'Aucune compétence' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async getSkillById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const skill = await Skill.findById(id);
        if (skill) {
          res.status(200).json(skill);
        } else {
          res.status(404).json({ message: `Compétence #${id} non trouvée` });
        }
      } else {
        res.status(400).json({ message: 'Mauvaise requête' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur de serveur interne' });
    }
  }

  async updateSkill(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const checkTitleUnicity = await Skill.findByTitle(req.body.title);
        if (checkTitleUnicity) {
          return res.status(401).json({ message: 'Titre déjà existant' });
        }

        const existingSkill = await Skill.findById(id);

        if (!existingSkill) {
          return res.status(404).json({ message: `Compétence #${id} non trouvée` });
        } else {
          await Skill.update(id, req.body);

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

  async deleteSkill(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const skill = await Skill.findById(id);
        if (skill) {
          await Skill.remove(id);
          res.status(200).json({ message: `Compétence #${id} supprimée` });
        } else {
          res.status(404).json({ message: `Compétence #${id} non trouvée` });
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

module.exports = new SkillController();
