const router = require('express').Router();

// Controller User router
const UserController = require('../../controllers/user.controller');

// Router Get Home Page
router.post('/register', UserController.Register);
router.post('/login', UserController.Login);



module.exports = router;