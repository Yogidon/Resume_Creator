const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Form = require('../models/form');

var Course = Form;

router.get('/',async (req, res) =>{
    const data = await Course.find().sort('name');
    res.send(data);
});

module.exports = router;