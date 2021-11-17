const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/authToken');
const { authenticateCreateUser } = require('../middlewares/authUser');
const { getInfo, getInfoById, createUser } = require('../controllers/controllerUser.js');

router.get('/', authenticateToken, (req, res) => {
  res.status(200).send('@GET USERS');
});
router.get('/info', authenticateToken, getInfo);
router.get('/info/:id', authenticateToken, getInfoById);

router.post('/create', authenticateCreateUser, createUser);

module.exports = router;
