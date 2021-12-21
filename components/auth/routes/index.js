const express = require('express');
const router = express.Router();

const { authenticateLogin } = require('../../../middlewares/authUser');

const { auth, refreshToken, destroyToken } = require('../controllers/');

router.get('/', authenticateLogin, (req, res) => auth(req, res));
router.post('/refresh', (req, res) => refreshToken(req, res));
router.post('/logout', (req, res) => destroyToken(req, res));

module.exports = router;
