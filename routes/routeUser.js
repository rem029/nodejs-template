const express = require('express');
const router = express.Router();

const { verifyUserLogin } = require('../middlewares/verifyUser.js');
const { login, logout, signup } = require('../controllers/controllerUser.js');

router.get('/', (req, res) => {
  res.status(200).send('@GET USERS');
});

router.post('/login', verifyUserLogin, (req, res) => login(req, res));
router.post('/logout', (req, res) => logout(req, res));
router.post('/signup', (req, res) => signup(req, res));

module.exports = router;
