const express = require('express');
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fonts = require('express-fonts');

hbs.registerPartials('./views/partials');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('./public'));
app.use('/',express.static('./font'));
app.use(fonts({
    'csspath': '/public',
    'fontspath': '/font',
    'fontsdir': './font'
}));

const courseSchema = new mongoose.Schema({
    name : {type:String,
        required : true,
        minlegth:5,
        maxlength:255
    },
    email : {type:String,
        required : true,
        match: /@gmail.com/
    },
    course : {
        type:String,
        required : true,
        enum:['Web Development','C++','Java','Python']
    },
    dob : {
        type: Date,
        default: Date.now,
        required : true
    },
    age : {
        type:Number,
        required : true,
        min:18,
        max:55
    },
    gender : {
        type:String,
        required : true,
        enum:['Male','Female']
    }
});

const Course = mongoose.model('course', courseSchema);

async function createCourse(name,email,courses,dob,age,gender ){
    const course = new Course({
        name : name ,
        email : email,
        course:courses,
        dob:dob,
        age:age,
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

app.post('/submit', function (req, res) {
    mongoose.connect('mongodb://localhost/Form_Data')
        .then(() => {
            console.log('Connected to MongoDB');
            createCourse(req.body.name,req.body.email,req.body.course,req.body.dob,req.body.age,req.body.gender)
        })
        .catch(err => console.error('Could not connect to mongodb ...', err));
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/show',  function(req, res) {
    mongoose.connect('mongodb://localhost/Form_Data')
        .then(() => {
            Course.find({},(err,found)=> {
                res.send(found)
            }).sort({name : 1})
        })
    });

app.listen(PORT,() => {
   console.log(`The Server is listeing on port ${PORT}`)
});

