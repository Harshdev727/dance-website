require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const port = process.env.PORT || 800;


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model('user', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true }))

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.status(200).send("This data has been send to the database");
    }).catch(() => {
        res.status(400).send("data was not send to the database");
    })

})


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});