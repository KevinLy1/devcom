/* eslint-disable prettier/prettier */
// Router()
const router = require('express').Router();

// Middlewares
const trimmer = require('../../middlewares/trimmer');
const sanitizer = require('../../middlewares/sanitizer');
const authentication = require('../../middlewares/authentication');
const { adminAuthorization } = require('../../middlewares/authorization');
// const validation

// Contrôleur
const AdminController = require('../../controllers/AdminController');

// Routes
// CREATE
router.post('/skills', authentication, adminAuthorization, trimmer, sanitizer, AdminController.createSkill);

// READ
router.get('/skills', authentication, adminAuthorization, AdminController.getSkills);
router.get('/skills/:id', authentication, adminAuthorization, AdminController.getSkillById);

// UPDATE
router.put('/skills/:id', authentication, adminAuthorization, trimmer, sanitizer, AdminController.updateSkill);

// DELETE
router.delete('/skills/:id', authentication, adminAuthorization, AdminController.deleteSkill);

module.exports = router;
