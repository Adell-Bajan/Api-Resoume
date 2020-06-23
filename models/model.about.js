const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    textabout: {
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

const About = mongoose.model('About', AboutSchema);

module.exports = About;