const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middlewares/authToken');

const {
  dataGetAll,
  dataAdd,
  dataUpdateById,
  deleteById,
} = require('../controllers/controllerData.js');

router.get('/', authenticateToken, dataGetAll);
router.post('/', authenticateToken, dataAdd);
router.put('/', authenticateToken, dataUpdateById);
router.delete('/', authenticateToken, deleteById);

module.exports = router;
