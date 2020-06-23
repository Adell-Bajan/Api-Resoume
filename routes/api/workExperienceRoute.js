const router = require('express').Router();

// Controller Skill router
const workExperience = require('../../controllers/workExperienceController');

// Router post skill
router.post('/add-workExperience', workExperience.addworkExperience);




module.exports =router