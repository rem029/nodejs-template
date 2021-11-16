const express = require('express');
const router = express.Router();

const { authenticateLogin } = require('../middlewares/authUser.js');

const { auth, refreshToken } = require('../controllers/controllerAuth.js');

router.get('/', authenticateLogin, (req, res) => auth(req, res));
router.post('/token', (req, res) => refreshToken(req, res));

module.exports = router;
