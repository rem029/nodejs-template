const express = require('express');
const router = express.Router();

const { verifyBodyData } = require('../middlewares/verifyBodyData.js');
const {
  dataGetAll,
  dataGetById,
  dataAdd,
  dataUpdateById,
  dataDeleteAll,
  dataDeleteById,
} = require('../controllers/controllerData.js');

router.get('/', verifyBodyData, (req, res) => dataGetAll(req, res));
router.get('/:id', verifyBodyData, (req, res) => dataGetById(req, res));

router.delete('/', verifyBodyData, (req, res) => dataDeleteAll(req, res));
router.delete('/:id', verifyBodyData, (req, res) => dataDeleteById(req, res));

router.post('/', verifyBodyData, (req, res) => dataAdd(req, res));
router.put('/:id', verifyBodyData, (req, res) => dataUpdateById(req, res));

module.exports = router;
