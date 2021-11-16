const http = require('http');

const logger = require('../helpers/logger');
const app = require('./app');

const httpServer = http.createServer(app);

//SERVER LISTENERS
httpServer.on('close', () => logger.info('HTTP: SERVER CLOSED'));
httpServer.on('clientError', () => logger.error('HTTP: SERVER ERROR'));
httpServer.on('connect', () => logger.info('HTTP: SERVER CONNECT'));
httpServer.on('connection', (data) =>
  logger.info(`HTTP: SERVER CONNECTION  ${JSON.stringify(data.address())}}`)
);
httpServer.on('error', () => logger.info('HTTP: SERVER ERROR'));

module.exports = httpServer;
