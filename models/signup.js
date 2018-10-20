const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const signupSchema = new mongoose.Schema({
    username : {type : String,
        required : true,
        unique : true
    },
    password : {type: String,
        required : true
    }
});

signupSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id}, 'yogidon');
};

const Signup = mongoose.model('user_details', signupSchema,'user_detail');

module.exports = Signup;