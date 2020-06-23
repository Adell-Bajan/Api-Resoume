// Require Model Skill
const WorkExperience = require('../models/model.workExperience')


// export controller post create workExperience
exports.addworkExperience = (req, res, next) => {
	let {
        job_title,
        companyـname,
        Startـdateـofـcooperation,
        Endـdateـofـcooperation,
        discription
    } = req.body
    if (!job_title ||!companyـname || !Startـdateـofـcooperation || !Endـdateـofـcooperation || !discription ) {
        return res.status(400).send({
            message: "Please enter field in field"
        });
    }
    // Create a Skill
    const workExperience = new WorkExperience({
        job_title: req.body.job_title,
        companyـname: req.body.companyـname,
        Startـdateـofـcooperation: req.body.Startـdateـofـcooperation,
        Endـdateـofـcooperation: req.body.Endـdateـofـcooperation,
        discription: req.body.discription,
    });
    workExperience.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error"
            });
        });
}