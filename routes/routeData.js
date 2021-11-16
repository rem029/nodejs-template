const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/authToken');

const { dataGetAll, dataAdd } = require('../controllers/controllerData.js');

router.get('/', authenticateToken, (req, res) => dataGetAll(req, res));
router.post('/', authenticateToken, (req, res) => dataAdd(req, res));

module.exports = router;
