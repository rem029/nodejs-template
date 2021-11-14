const axiosTimeOut = 600000; // 10 minutes in ms

const configs = {
  SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,

  isProduction: process.env.NODE_ENV === 'prod',

  port: process.env.PORT || 6060,

  dbUrl: {
    offline: process.env.DB_OFFLINE_URL,
    online: process.env.DB_ONLINE_URL,
  },

  projectIds: {
    BP12: '536900101',
    BP12A: '536900966',
    BP12B: '536900967',
    BP12C: '536900968',
    BP12D: '536900969',
    BP12DFF: '',
  },

  isOffline: false,
  isTestError: false,
};

module.exports = configs;
