const configs = {
  isProduction: process.env.NODE_ENV === 'production',

  port: process.env.PORT || 6060,

  dbUrl: {
    offline: process.env.DB_URL_OFFLINE,
    online: process.env.DB_URL_ONLINE,
  },
};

module.exports = configs;
