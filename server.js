const express = require('express');
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fonts = require('express-fonts');

const form = require('./routes/form');
const database = require('./routes/database');
const search = require('./routes/search');
const signup = require('./routes/signup');
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');

hbs.registerPartials('./views/partials');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('./public'));
app.use('/',express.static('./public/database'));
app.use('/',express.static('./font'));
app.use('/api/form',form);
app.use('/api/search',search);
app.use('/api/database',database);
app.use('/api/signup' ,signup);
app.use('/api/auth' ,auth);
app.use('/api/dashboard',dashboard);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json);
app.use(fonts({
    'csspath': '/public',
    'fontspath': '/font',
    'fontsdir': './font'
}));

mongoose.connect('mongodb://localhost/Form_Data')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to MongoDB'));

app.listen(PORT,() => {
    console.log(`The Server is listening on port ${PORT}`)
});