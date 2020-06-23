const router = require('express').Router();

// Controller User router
const AboutmeController = require('../../controllers/aboutmeController');
const { route } = require('./userRoute');

// Router Get Home Page
router.post('/add-aboutme', AboutmeController.addAbout);

// Retrieve all About
router.get('/allaboutme', AboutmeController.allaboutme);

// Retrieve a single About with Abou id
router.get('/:aboutId', AboutmeController.aboutOne);


// Update aboute me
router.put('/:aboutId', AboutmeController.updateAbout);


// Delete a Note with noteId
router.delete('/:aboutId', AboutmeController.deleteAbout);


module.exports = router;