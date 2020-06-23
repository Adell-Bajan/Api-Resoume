// Require Model User
const User = require('../models/models.user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/keys').secret;
const { secretOrKey } = require('../config/keys');



// export controller post register
exports.Register = (req, res, next) => {
    let {
        username,
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        phonenumber
    } = req.body
    if (!username || !firstname || !lastname || !email || !password || !phonenumber) {
        return res.status(400).json({
            msg: "Please enter field"
        });
    }
    if (password !== confirmpassword) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // Check for the unique username
    User.findOne({
            username: username
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    ms: "Username is already token."
                });
            }
        })
        // Check for the Unique Email
    User.findOne({
            email: email
        }).then(user => {
            if (user) {
                return res.status(400).json({
                    ms: "Email is already registred. Did you forget your password.",
                });
            }
        })
        // the data is valid and new we can registred the user
    let newUser = new User({
        username,
        firstname,
        lastname,
        email,
        password,
        confirmpassword,
        phonenumber
    });
    // Hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    user,
                    success: true,
                    msg: "User is now registred.",
                });
            });
        });
    });
}


// export controller post login
exports.Login = (req, res, next) => {
    if (
        (!req.body.username) ||
        (!req.body.password)
    ) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }

    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Username is not found.",
                success: false
            });
        }
        // idf there is user we are now going to compare the password
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                // Users password is correct and we need to send the json token for that user
                const payload = {
                    _id: user._id,
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                }


                jwt.sign({ payload }, secretOrKey, { expiresIn: 604800 }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `${token}`,
                        user: user,
                        msg: 'Hello ! You are now logged in.'
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Incorrect password.",
                    success: false
                });
            }
        })
    });
}