const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
	},
	user:{
		type:mongoose.Types.ObjectId,
		required:true
	},
    date: {
        type: Date,
        default: Date.now
    }
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;