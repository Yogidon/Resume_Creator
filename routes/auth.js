const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/signup');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json);

router.get('/me',auth,async (req, res)=>{
    const me = await User.findById(req.user._id);
    res.send(me);
    console.log("What is this"+req.user._id)
});

router.post('/', async (req, res) => {
    user = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.findOne({username:req.body.username},async (err,found)=>{
        if(!found) res.status(400).send('Invalid password or email');
        const validPassword = await bcrypt.compare(req.body.password,found.password);
        if(!validPassword) res.status(400).send('Invalid password or email');
        const token = user.generateToken();
        res.send(token);
        console.log(token)
    });
});

module.exports = router;