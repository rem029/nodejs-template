const logger = require('../helpers/logger.js');

const verifyBodyData = (req = Request, res = Response, next) => {
  logger.info('from middleware verifyBody Data');
  next();
};

module.exports = { verifyBodyData };
