const mongoose = require('mongoose');
const logger = require('../helpers/logger');
const configs = require('../configs/configs');

const dbConnect = (dbName = '') => {
  const url = configs.isProduction
    ? configs.dbUrl.online + dbName
    : configs.dbUrl.offline + dbName;

  if (mongoose.connection.readyState == 0) {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.set('useCreateIndex', true);
    logger.info(`Database connecting at url: ${url}`);
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
