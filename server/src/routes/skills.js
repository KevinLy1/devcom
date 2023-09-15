// Router()
const router = require('express').Router();

// Contrôleur
const SkillController = require('../controllers/SkillController');

// Routes
// READ
router.get('/', SkillController.getSkills);
router.get('/:id', SkillController.getSkillById);

module.exports = router;
