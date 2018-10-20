const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/signup');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json);

router.post('/', async (req, res) => {
    user = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.findOne({username : req.body.username},(err,found) =>{
        if(found) res.status(400).send('Problemo');
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();
    const token = user.generateToken();
    res.header('x-auth-token',token).send(user)
    
});

module.exports = router;