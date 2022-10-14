const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// Define Mongoose Scheema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String
  });
  var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
});
app.get('/services', (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
});
app.get('/class', (req, res)=>{
    const params = {}
    res.status(200).render('class.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
        myData.save().then(()=>{
            res.send("This item saved to the database")
        }).catch(()=>{
            res.status(400).send("Item was not saved to the database")
        })});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});