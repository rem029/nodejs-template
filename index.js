require('dotenv').config();
const dbConnect = require('./services/database');
const server = require('./services/server');
const socketio = require('./services/socketio');

const configs = require('./configs/configs');
const logger = require('./helpers/logger');

const port = configs.port;

server.listen(port, () => {
  logger.info('Server running on port:' + port);
  logger.info('Server running in mode: ' + process.env.NODE_ENV);
});

dbConnect('db');
socketio.connect(server);
