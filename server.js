const express = require('express');
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('./public'));

const courseSchema = new mongoose.Schema({
    name : String,
    course : String,
    dob : { type: Date, default: Date.now},
    age : Number
});

const Course = mongoose.model('course', courseSchema);

async function createCourse(name, courses, dob,age ){
    const course = new Course({
        name : name ,
        course:courses,
        dob:dob,
        age:age
    });

    const result = await course.save();
    console.log(result);
}

app.post('/post-feedback', function (req, res) {
    mongoose.connect('mongodb://localhost/admin')
        .then(() => {
            console.log('Connected to MongoDB')
            createCourse(req.body.name,req.body.course,req.body.dob,req.body.age)
        })
        .catch(err => console.error('Could not connect to mongodb ...', err));
    res.send('Data received:\n' + JSON.stringify(req.body));
});

app.get('/view-feedbacks',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});

app.listen(PORT,() => {
   console.log(`The Server is listeing on port ${PORT}`)
});