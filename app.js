const express = require("express");
const path = require("path");
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/jeep', { useNewUrlParser: true });
const port = 1002;

// Define mongoose schema
var meridianSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

var Meridian = mongoose.model('Meridian', meridianSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the tamplet engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINS
app.get('/', (req, res) => {
    res.render('home.pug');
})
app.get('/contact', (req, res) => {
    res.render('contact.pug');
})
app.get('/services', (req, res) => {
    res.render('services.pug');
})
app.get('/about', (req, res) => {
    res.render('about.pug');
})
app.post('/contact', (req, res) => {
    var myData = new Meridian(req.body);
    myData.save().then(() => {
        res.send("This item has been send to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the databased")
    });
    // res.render('contact.pug');
})
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})