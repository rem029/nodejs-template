const socketio = require('socket.io');
const logger = require('../helpers/logger');

exports.connect = (server) => {
  global.io = socketio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (client) => {
    logger.info('SOCKETIO: A client connected');

    client.on('disconnect', () => {
      logger.info('SOCKETIO: A client got disconnected');
    });
  });
};
