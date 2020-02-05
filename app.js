const express = require('express');
const bodyParser = require('body-parser');

const product = require('./routes/product.route'); // Imports routes for the products
const app = express();

// Set up mongoose connection
const dbConfig = require('./configs/database.config');
const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI || dbConfig.url

mongoose.Promise = global.Promise;

// Connecting to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(mongoDB, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

let port = 1234;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);


app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});



