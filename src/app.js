require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Import routes
// const swaggerUi = require('swagger-ui-express');
//const swaggerSpec = require('./swaggerConfig');
// const docsElements = require('./docs');


const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use('/public/uploads', express.static('public/uploads'));
app.use(cors());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)

    // Pass to next layer of middleware
    next();
});
app.use(morgan('dev'));

app.use(express.json());

// Use the centralized routes
app.use(routes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docsElements));




// Logic goes here

module.exports = app;