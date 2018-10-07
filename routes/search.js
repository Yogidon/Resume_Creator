const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Course = require('../models/form');


router.get('/:name', async (req, res) => {
    var name = req.param.name;
    Course.find({name:name}, (err,data) => {
        if (err)
            console.log(err);
        else
            res.send(data);
    });
});

/*router.get('/:course',  function(req, res) {
    mongoose.connect('mongodb://localhost/Form_Data')
        .then(() => {
            var course = req.param(course);
            Course.find({name: course},(err,found)=> {
                res.send(found)
            }).sort({name : 1})
        })
});*/

module.exports = router;