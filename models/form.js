const mongoose = require('mongoose');


const Form = mongoose.model('Form', new mongoose.Schema({
    name : {type:String,
        required : true,
        minlength:5,
        maxlength:255,
        trim : true
    },
    email : {type:String,
        required : true,
        match: /@gmail.com/,
        trim : true
    },
    course : {
        type:String,
        required : true,
        enum:['WEB DEVELOPMENT','C++','JAVA','PYTHON'],
        uppercase : true,
        trim : true

    },
    dob : {
        type: Date,
        default: Date.now,
        required : true,
        trim : true
    },
    gender : {
        type:String,
        required : true,
        enum:['MALE','FEMALE'],
        uppercase : true,
        trim : true
    }
}));

module.exports = Form ;