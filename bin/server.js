const express = require('express');
const bodyParser = require('body-parser');
const loadRoutes = require('../lib/router');

// Instantiate express
const app = express();

// Set our port
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register our routes in app
app.use('/', loadRoutes(express.Router()));

const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = { app, server };
