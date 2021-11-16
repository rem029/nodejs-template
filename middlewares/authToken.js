const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger.js');

const authenticateToken = (req = new Request(), res = Response, next) => {
  logger.info('from middleware verify Token');
  // checking here
};

const generateToken = (payload) => jwt.sign(payload, process.env.API_TOKEN_SECRET);

module.exports = { authenticateToken, generateToken };
