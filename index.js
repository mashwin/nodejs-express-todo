const express = require('express');
const router = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// setup express app
const app = express();

mongoose.connect('mongodb://localhost/tododb');
mongoose.Promise = global.Promise;

const port = process.env.port || 4000;

app.use(bodyParser.json());

app.use(router);
//listen for requests
app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})

app.get('/', function (req, res) {
    console.log('the get request');
})