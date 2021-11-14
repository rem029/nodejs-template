const express = require('express');
const router = express.Router();

const now = require('../__helpers/now');
const logger = require('../__helpers/logger');

const { createOrder } = require('../___controllers/controllerOrder');

router.post('/create', (req, res) => createOrder(res, req));

module.exports = router;
