const express = require('express');
const router = express.Router();

const {
  dataGetAll,
  dataGetById,
  dataAdd,
  dataUpdateById,
  dataDeleteAll,
  dataDeleteById,
} = require('../controllers/controllerData.js');

router.get('/', (req, res) => dataGetAll(req, res));
router.get('/:id', (req, res) => dataGetById(req, res));

router.delete('/', (req, res) => dataDeleteAll(req, res));
router.delete('/:id', (req, res) => dataDeleteById(req, res));

router.post('/', (req, res) => dataAdd(req, res));
router.put('/:id', (req, res) => dataUpdateById(req, res));

module.exports = router;
