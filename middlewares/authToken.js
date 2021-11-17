const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger.js');

const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.API_TOKEN_SECRET, { expiresIn: '15m' });
const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.API_TOKEN_REFRESH, { expiresIn: '1yr' });

const decodeToken = (token) => jwt.verify(token, process.env.API_TOKEN_SECRET);

const authenticateToken = (req = new Request(), res = Response, next) => {
  logger.info('from middleware verify Token');
  const tokenFromHeader = req.headers['authorization'];
  const token = tokenFromHeader && tokenFromHeader.split(' ')[1];

  if (!token) return res.status(403).json('A token is required for authentication');
  try {
    const decodedUser = decodeToken(token);
    req.user = decodedUser;
  } catch (error) {
    logger.error(`authenticating token error: ${JSON.stringify(error)}`);
    return res.status(401).json('Token has expired or invalid.');
  }
  next();
};

module.exports = { authenticateToken, generateAccessToken, generateRefreshToken };
