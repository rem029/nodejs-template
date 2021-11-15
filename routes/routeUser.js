const express = require('express');
const router = express.Router();

const { verifyBodyUser } = require('../middlewares/verifyBodyUser.js');
const { login, logout, signup } = require('../controllers/controllerUser.js');

router.get('/', verifyBodyUser, (req, res) => {
  res.status(200).send('@GET USERS');
});
router.post('/login', verifyBodyUser, (req, res) => login(req, res));
router.post('/logout', verifyBodyUser, (req, res) => logout(req, res));
router.post('/signup', verifyBodyUser, (req, res) => signup(req, res));

module.exports = router;
