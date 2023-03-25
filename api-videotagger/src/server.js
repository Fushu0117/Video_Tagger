const express = require('express');
const { cors_options } = require('./config/cors');
const logger = require('./middleware/logs');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors(cors_options));

app.use(logger());

app.use('/api', routes);

module.exports = app;
