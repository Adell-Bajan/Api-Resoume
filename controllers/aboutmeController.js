// Require Model About
const Aboutme = require('../models/model.about')



// export controller post create aboute me
exports.addAbout = (req, res, next) => {
    if (!req.body.textabout) {
        return res.status(400).send({
            message: "Please enter textabout field"
        });
    }
    // Create a Aboutme
    const aboutme = new Aboutme({
        textabout: req.body.textabout
    });
    aboutme.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
}



// export controller post findall
exports.allaboutme = (req, res, next) => {
	Aboutme.find()
    .then(aboutmes => {
        res.send(aboutmes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ."
        });
    });
}




// Find a single about with a aboutId
exports.aboutOne = (req, res) => {
    Aboutme.findById(req.params.aboutId)
    .then(about => {
        if(!about) {
            return res.status(404).send({
                message: "About not found with id " + req.params.aboutId
            });            
        }
        res.send(about);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "About not found with id " + req.params.aboutId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving with id " + req.params.aboutId
        });
    });
};





// Update aboutme
exports.updateAbout = (req, res) => {
    // Validate Request
    if(!req.body.textabout) {
        return res.status(400).send({
            message: "textabout can not be empty"
        });
    }

    // Find note and update it with the request body
    Aboutme.findByIdAndUpdate(req.params.aboutId, {
        textabout: req.body.textabout
    }, {new: true})
    .then(about => {
        if(!about) {
            return res.status(404).send({
                message: "About not found with id " + req.params.aboutId
            });
        }
        res.send(about);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "About not found with id " + req.params.aboutId
            });                
        }
        return res.status(500).send({
            message: "Error updating about with id " + req.params.aboutId
        });
    });
};




// Delete about
exports.deleteAbout = (req, res) => {
    Aboutme.findByIdAndRemove(req.params.aboutId)
    .then(about => {
        if(!about) {
            return res.status(404).send({
                message: "not found with id " + req.params.aboutId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "not found with id " + req.params.aboutId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.aboutId
        });
    });
};