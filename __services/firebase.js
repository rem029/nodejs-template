const fs = require('firebase-admin');
const serviceAccount = require('../fs_service_account');
const firebase = fs.initializeApp({ credential: fs.credential.cert(serviceAccount) });
module.exports = firebase;
