const Category = require('../models/Category');
const Skill = require('../models/Skill');
const SocialNetwork = require('../models/SocialNetwork');

class AdminController {
  // ******************************* CRUD Categories *******************************
  async createCategory(req, res) {
    try {
      const checkTitleUnicity = await Category.findByTitle(req.body.title);
      if (checkTitleUnicity) {
        return res.status(401).json({ message: 'Title already exists' });
      }

      await Category.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      if (categories) {
        res.status(200).json(categories);
      } else {
        res.status(404).json({ message: 'No categories found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getCategoryById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const category = await Category.findById(id);
        if (category) {
          res.status(200).json(category);
        } else {
          res.status(404).json({ message: `Category #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateCategory(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const checkTitleUnicity = await Category.findByTitle(req.body.title);
        if (checkTitleUnicity) {
          return res.status(401).json({ message: 'Title already exists' });
        }

        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
          return res.status(404).json({ message: `Category #${id} not found` });
        } else {
          await Category.update(id, req.body);

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

  async deleteCategory(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const category = await Category.findById(id);
        if (category) {
          await Category.remove(id);
          res.status(200).json({ message: `Category #${id} deleted` });
        } else {
          res.status(404).json({ message: `Category #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  // ******************************* CRUD Skills *******************************
  async createSkill(req, res) {
    try {
      const checkTitleUnicity = await Skill.findByTitle(req.body.title);
      if (checkTitleUnicity) {
        return res.status(401).json({ message: 'Title already exists' });
      }

      await Skill.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getSkills(req, res) {
    try {
      const skills = await Skill.findAll();
      if (skills) {
        res.status(200).json(skills);
      } else {
        res.status(404).json({ message: 'No skills found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
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
          res.status(404).json({ message: `Skill #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateSkill(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const checkTitleUnicity = await Skill.findByTitle(req.body.title);
        if (checkTitleUnicity) {
          return res.status(401).json({ message: 'Title already exists' });
        }

        const existingSkill = await Skill.findById(id);

        if (!existingSkill) {
          return res.status(404).json({ message: `Skill #${id} not found` });
        } else {
          await Skill.update(id, req.body);

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

  async deleteSkill(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const skill = await Skill.findById(id);
        if (skill) {
          await Skill.remove(id);
          res.status(200).json({ message: `Skill #${id} deleted` });
        } else {
          res.status(404).json({ message: `Skill #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  // ******************************* CRUD Social Networks *******************************
  async createSocialNetwork(req, res) {
    try {
      const checkTitleUnicity = await SocialNetwork.findByTitle(req.body.title);
      if (checkTitleUnicity) {
        return res.status(401).json({ message: 'Title already exists' });
      }

      await SocialNetwork.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getSocialNetworks(req, res) {
    try {
      const socialNetworks = await SocialNetwork.findAll();
      if (socialNetworks) {
        res.status(200).json(socialNetworks);
      } else {
        res.status(404).json({ message: 'No social networks found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getSocialNetworkById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const socialNetwork = await SocialNetwork.findById(id);
        if (socialNetwork) {
          res.status(200).json(socialNetwork);
        } else {
          res.status(404).json({ message: `Social network #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateSocialNetwork(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const checkTitleUnicity = await SocialNetwork.findByTitle(req.body.title);
        if (checkTitleUnicity) {
          return res.status(401).json({ message: 'Title already exists' });
        }

        const existingSocialNetwork = await SocialNetwork.findById(id);

        if (!existingSocialNetwork) {
          return res.status(404).json({ message: `Social network #${id} not found` });
        } else {
          await SocialNetwork.update(id, req.body);

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

  async deleteSocialNetwork(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const socialNetwork = await SocialNetwork.findById(id);
        if (socialNetwork) {
          await SocialNetwork.remove(id);
          res.status(200).json({ message: `Social network #${id} deleted` });
        } else {
          res.status(404).json({ message: `Social network #${id} not found` });
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

module.exports = new AdminController();
