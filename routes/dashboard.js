const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/form');

router.get('/',auth,async (req, res) => {
    User.findOne({},(err,found) =>{
        res.send(found);
    });
});

module.exports = router;