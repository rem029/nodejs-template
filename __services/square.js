const { ApiError, Client, Environment } = require('square');
const { isProduction, SQUARE_ACCESS_TOKEN } = require('../__configs/configs');

const square = new Client({
  environment: isProduction ? Environment.Production : Environment.Sandbox,
  accessToken: SQUARE_ACCESS_TOKEN,
});

module.exports = { ApiError, square };
