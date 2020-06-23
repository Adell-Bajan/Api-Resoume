const router = require('express').Router();

// Controller Skill router
const SkillController = require('../../controllers/skillsController');


// Router post skill
router.post('/add-skill', SkillController.addSkill);


// Retrieve all Skill
router.get('/allskill', SkillController.allSkill);

// Retrieve a single Skill with Skill id
router.get('/:skillId', SkillController.skillOne);


// Update skill 
router.put('/:skillId', SkillController.updateSkill);



// Delete a Skill with skillId
router.delete('/:skillId', SkillController.deleteSkill);


module.exports = router;