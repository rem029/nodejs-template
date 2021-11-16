const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger.js');

const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.API_TOKEN_SECRET, { expiresIn: '15s' });
const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.API_TOKEN_REFRESH);

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
    return res.status(401).json('Invalid token');
  }
  next();
};

module.exports = { authenticateToken, generateAccessToken, generateRefreshToken };
