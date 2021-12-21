const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('../components/auth/routes/');
const user = require('../components/users/routes/');
const data = require('../components/datas/routes/');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/auth', auth);
app.use('/user', user);
app.use('/data', data);

//Default routes
app.get('/', async (req, res) => {
  res.send(`<h1>Its online!!!</h1>`);
});

app.get('/favicon.ico', async (req, res) => {
  res.redirect('/');
});

module.exports = app;
