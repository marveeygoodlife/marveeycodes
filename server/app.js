'use strict'
const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const path = require("path");

//import routes
const formRoutes = require("./routes/formRoutes");

//import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

//security middlewares
app.use(helmet());
app.use(cors());

//serve static files
app.use(express.static(path.join(__dirname, '../client')));

//body parsing middleware 
app.use(express.json({
    limit: '10mb' //limit body to 10mb
}));
app.use(express.urlencoded({ extended: true }));


//API Routes
app.use('/api', formRoutes);

//serve client for any other route
// Use '/*' as the catch-all path so path-to-regexp parses it correctly
// Use a RegExp route to avoid path-to-regexp parsing issues with certain versions
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// error handling
app.use(errorHandler);

module.exports = app;