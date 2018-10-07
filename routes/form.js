const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Form = require('../models/form');
var Course = Form;

async function createCourse(name,email,courses,dob,gender ){
    const course = new Course({
        name : name ,
        email : email,
        course:courses,
        dob:dob,
        gender:gender
    });
    try{
        const result = await course.save();
        console.log(result);
    }
    catch (e) {
        console.log(`The Error is ${e.message}`)
    }
}

router.post('/', function (req, res) {
    mongoose.connect('mongodb://localhost/Form_Data')
        .then(() => {
            console.log('Connected to MongoDB');
            createCourse(req.body.name,req.body.email,req.body.course,req.body.dob,req.body.gender)
        })
        .catch(err => console.error('Could not connect to mongodb ...', err));
    res.send('Data received:\n' + JSON.stringify(req.body));
});

module.exports = router;