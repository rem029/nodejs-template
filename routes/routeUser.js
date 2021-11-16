const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/authToken');
const { authenticateCreateUser } = require('../middlewares/authUser');
const { getInfo, getInfoById, createUser } = require('../controllers/controllerUser.js');

router.get('/', authenticateToken, (req, res) => {
  res.status(200).send('@GET USERS');
});
router.get('/info', authenticateToken, (req, res) => getInfo(req, res));
router.get('/info/:id', authenticateToken, (req, res) => getInfoById(req, res));

router.post('/create', authenticateCreateUser, (req, res) => createUser(req, res));

module.exports = router;
