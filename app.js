const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport')

// Intialize app
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());


// Use the passport middleware
app.use(passport.initialize());
// Bring in the passport Strategy
require('./config/passport')(passport);


// Connect to mongodb
const db = require('./config/keys').mongoURI;
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});


// Bring in the Users route
const users = require('./routes/api/userRoute');
const about = require('./routes/api/aboutmeRoute');
const skills = require('./routes/api/skillsRoute');
const workExperience = require('./routes/api/workExperienceRoute');
app.use('/api/users', users);
app.use('/api/about-me', about);
app.use('/api/skill',skills );
app.use('/api/workExperience',workExperience );

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})