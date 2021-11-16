const express = require('express');
const app = express();
const cors = require('cors');
const routeAuth = require('../routes/routeAuth');
const routeUser = require('../routes/routeUser.js');
const routeData = require('../routes/routeData.js');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/auth', routeAuth);
app.use('/user', routeUser);
app.use('/data', routeData);

//Default routes
app.get('/', async (req, res) => {
  res.send(`<h1>Its online!!!</h1>`);
});

app.get('/favicon.ico', async (req, res) => {
  res.redirect('/');
});

module.exports = app;
