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
const SkillController = require('../../controllers/SkillController');

// Routes
// CREATE
router.post('/', authentication, adminAuthorization, trimmer, sanitizer, SkillController.createSkill);

// READ
router.get('/', authentication, adminAuthorization, SkillController.getSkills);
router.get('/:id', authentication, adminAuthorization, SkillController.getSkillById);

// UPDATE
router.put('/:id', authentication, adminAuthorization, trimmer, sanitizer, SkillController.updateSkill);

// DELETE
router.delete('/:id', authentication, adminAuthorization, SkillController.deleteSkill);

module.exports = router;
