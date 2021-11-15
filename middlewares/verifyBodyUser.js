const logger = require('../helpers/logger.js');

const verifyBodyUser = (req = Request, res = Response, next) => {
  logger.info('from middleware verifyBody User');
  next();
};

module.exports = { verifyBodyUser };
