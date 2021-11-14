const mongoose = require('mongoose');
const logger = require('../__helpers/logger');
const configs = require('../__configs/configs');

const dbConnect = () => {
  const url = configs.isProduction ? configs.dbUrl.online : configs.dbUrl.offline;

  if (mongoose.connection.readyState == 0) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    logger.info('Database connecting...');
  }

  const dbConnection = mongoose.connection;

  dbConnection.on('error', () => {
    logger.error('Database connection error');
  });
  dbConnection.once('open', () => {
    logger.info('Database connected successfully');
  });

  return dbConnection;
};

module.exports = dbConnect;
