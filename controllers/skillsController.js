// Require Model Skill
const Skill = require('../models/model.skills')



// export controller post create skill
exports.addSkill = (req, res, next) => {
    if (!req.body.skill) {
        return res.status(400).send({
            message: "Please enter skill field"
        });
    }
    // Create a Skill
    const skill = new Skill({
        skill: req.body.skill
    });
    skill.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
}


// export controller post findall
exports.allSkill = (req, res, next) => {
	Skill.find()
    .then(skills => {
        res.send(skills);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ."
        });
    });
}


// Find a single skill with a skillId
exports.skillOne = (req, res) => {
    Skill.findById(req.params.skillId)
    .then(skill => {
        if(!skill) {
            return res.status(404).send({
                message: "About not found with id " + req.params.skillId
            });            
        }
        res.send(skill);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "About not found with id " + req.params.skillId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving with id " + req.params.skillId
        });
    });
};


// Update skill
exports.updateSkill = (req, res) => {
    // Validate Request
    if(!req.body.skill) {
        return res.status(400).send({
            message: "skill can not be empty"
        });
    }

    // Find note and update it with the request body
    Skill.findByIdAndUpdate(req.params.skillId, {
        skill: req.body.skill
    }, {new: true})
    .then(skill => {
        if(!skill) {
            return res.status(404).send({
                message: "Skill not found with id " + req.params.skillId
            });
        }
        res.send(skill);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Skill not found with id " + req.params.skillId
            });                
        }
        return res.status(500).send({
            message: "Error updating skill with id " + req.params.skillId
        });
    });
};



// Delete Skill
exports.deleteSkill = (req, res) => {
    Skill.findByIdAndRemove(req.params.skillId)
    .then(skill => {
        if(!skill) {
            return res.status(404).send({
                message: "not found with id " + req.params.skillId
            });
        }
        res.send({message: "Skill deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "not found with id " + req.params.skillId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.skillId
        });
    });
};