require('dotenv').config();
const server = require('./__services/server');
// const dbConnect = require('./__services/database');

const socketio = require('./__services/socketio');

const configs = require('./__configs/configs');
const logger = require('./__helpers/logger');

const port = configs.port;

server.listen(port, () => {
  logger.info('Server running on port:' + port);
  logger.info('Server running in mode: ' + process.env.NODE_ENV);
});

// dbConnect();
socketio.connect(server);
