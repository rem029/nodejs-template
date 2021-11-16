const logger = require('../helpers/logger.js');

const actions = { signUp: 'signUp', login: 'login' };

const verifyBody = (reqBody, action) => {
  let verifyStatus = { isAccepted: false, message: '' };

  const hasEmail = reqBody.email && reqBody.email;
  const hasPassword = reqBody.password && reqBody.password;

  switch (action) {
    case actions.signUp:
      break;
    case actions.login:
      if (hasEmail && hasPassword) {
        verifyStatus.isAccepted = true;
        verifyStatus.message = '';
        break;
      }
      verifyStatus.message = 'Email or password not found';
      break;
    default:
      verifyStatus.isAccepted = false;
      verifyStatus.message = 'Invalid action';
      break;
  }

  return verifyStatus;
};

const verifyUserLogin = (req = new Request(), res = new Response(), next) => {
  logger.info(`from middleware verifyBodyUserLogin ${JSON.stringify(req.body)}`);
  // checking here
  const verifyResponse = verifyBody(req.body, actions.login);

  if (!verifyResponse.isAccepted) return res.status(400).send(verifyResponse.message);

  next();
};

const verifyUserSignup = (req = new Request(), res = new Response(), next) => {
  logger.info(`from middleware verifyBodyUserLogin ${JSON.stringify(req.body)}`);
  // checking here
  const verifyResponse = verifyBody(req.body, actions.signUp);

  if (!verifyResponse.isAccepted) return res.status(400).send(verifyResponse.message);

  next();
};

module.exports = { verifyUserLogin };
