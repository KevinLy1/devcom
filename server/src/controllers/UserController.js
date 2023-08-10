const User = require('../models/User');

class UserController {
  async createUser(req, res) {
    try {
      const checkUsernameUnicity = await User.findByUsername(req.body.username);
      if (checkUsernameUnicity) return res.status(401).json({ message: 'Username already taken' });

      const checkEmailUnicity = await User.findByEmail(req.body.email);
      if (checkEmailUnicity)
        return res.status(401).json({ message: 'Email address already taken' });

      await User.create(req.body);
      return res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'No users found.' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const user = await User.findById(id);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: `User #${id} not found` });
        }
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        if (req.body.username) {
          const checkUsernameUnicity = await User.findByUsername(req.body.username);
          if (checkUsernameUnicity) {
            return res.status(401).json({ message: 'Username already taken' });
          }
        }

        if (req.body.email) {
          const checkEmailUnicity = await User.findByEmail(req.body.email);
          if (checkEmailUnicity) {
            return res.status(401).json({ message: 'Email address already taken' });
          }
        }

        const existingUser = await User.findById(id);

        if (!existingUser) {
          return res.status(404).json({ message: `User #${id} not found` });
        } else {
          await User.update(id, req.body);

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

  async deleteUser(req, res) {
    try {
      const id = req.params.id;

      if (!isNaN(id)) {
        const user = await User.findById(id);
        if (user) {
          await User.remove(id);
          res.status(200).json({ message: `User #${id} deleted` });
        } else {
          res.status(404).json({ message: `User #${id} not found` });
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

module.exports = new UserController();
