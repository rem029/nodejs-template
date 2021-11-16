const logger = require('../helpers/logger.js');
const bcrypt = require('bcrypt');

const verifyBodySignUp = (reqBody) => {
  let verifyStatus = { isAccepted: false, message: '' };

  const hasEmail = reqBody.email && reqBody.email;
  const hasPassword = reqBody.password && reqBody.password;

  if (hasEmail && hasPassword) {
    verifyStatus.isAccepted = true;
    verifyStatus.message = '';
    return verifyStatus;
  }

  verifyStatus.isAccepted = false;
  verifyStatus.message = 'Invalid body';
  return verifyStatus;
};

const passwordEncrypt = (password) => bcrypt.hash(password, 10);
const passwordCompare = (password, passwordHashed) =>
  bcrypt.compare(password, passwordHashed);

const authenticateLogin = async (req = new Request(), res = new Response(), next) => {
  const userFromHeader =
    req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!userFromHeader) res.status(400).send('Authorization header is required.');

  const user = Buffer.from(userFromHeader, 'base64').toString().split(':');
  const email = user[0];
  const password = user[1];

  logger.info(
    `from middleware verifyBodyUserLogin. email: ${email}, password ${password}`
  );
  req.user = { email: email, password: password };
  next();
};

const authenticateCreateUser = async (
  req = new Request(),
  res = new Response(),
  next
) => {
  logger.info(`from middleware verifyUserSignup ${JSON.stringify(req.body)}`);
  const verifyBodyResponse = verifyBodySignUp(req.body);

  if (!verifyBodyResponse.isAccepted)
    return res.status(400).send(verifyBodyResponse.message);

  req.body.password = await passwordEncrypt(req.body.password);
  next();
};

module.exports = {
  authenticateLogin,
  authenticateCreateUser,
  passwordEncrypt,
  passwordCompare,
};