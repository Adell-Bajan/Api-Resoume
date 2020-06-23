const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true
	},
	companyـname: {
        type: String,
        required: true
	},
	Startـdateـofـcooperation: {
        type:Number,
        required: true
	},
	Endـdateـofـcooperation: {
        type:Number,
        required: true
	},
	discription:{
		type:String,
		required:true
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

const workExperience = mongoose.model('workExperience', workExperienceSchema);

module.exports = workExperience;