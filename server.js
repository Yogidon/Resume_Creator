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

hbs.registerPartials('./views/partials');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('./public'));
app.use('/',express.static('./public/database'));
app.use('/',express.static('./font'));
app.use('/api/form',form);
app.use('/api/search',search);
app.use('/api/database',database);
app.use(fonts({
    'csspath': '/public',
    'fontspath': '/font',
    'fontsdir': './font'
}));

mongoose.connect('mongodb://localhost/Form_Data')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Could not connect to MongoDB'));

app.listen(PORT,() => {
    console.log(`The Server is listeing on port ${PORT}`)
});