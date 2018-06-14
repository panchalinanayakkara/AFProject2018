const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Imports routes
const productRoutes = require('./api/routes/drugs');
const batchRoutes = require('./api/routes/batchs');

mongoose.connect('mongodb+srv://anjali:anjali@cluster0-z8mhs.mongodb.net/test');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/drugs', productRoutes);
app.use('/batchs', batchRoutes);


//Common not route handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Handle coomon error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;