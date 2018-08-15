const express = require('express');
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

hbs.registerPartials('./views/partials');
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('./public'));

app.post('/post-feedback', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id;
        db.collection('feedbacks').insertOne(req.body);
    });
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