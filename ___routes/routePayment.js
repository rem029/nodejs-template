const express = require('express');
const router = express.Router();

const now = require('../__helpers/now');
const logger = require('../__helpers/logger');

const { createPayment } = require('../___controllers/controllerPayment');

router.post('/create', (req, res) => createPayment(res, req));

module.exports = router;
