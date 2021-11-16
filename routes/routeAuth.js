const express = require('express');
const router = express.Router();

const { authenticateLogin } = require('../middlewares/authUser.js');
const { auth } = require('../controllers/controllerAuth.js');

router.get('/', authenticateLogin, (req, res) => auth(req, res));

module.exports = router;
