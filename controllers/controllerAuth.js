const { modelUsers } = require('../models/modelUser');
const { generateToken } = require('../middlewares/authToken');
const logger = require('../helpers/logger');

const auth = async (req = new Request(), res = Response) => {
  try {
    logger.info(`@auth controller user for ${JSON.stringify(req.user)}`);

    const { email, password } = req.user;

    const userFindResponse = await modelUsers.findOne({
      email: email,
      password: password,
    });

    if (!userFindResponse) return res.status(401).json('invalid email or password');

    const user = { id: userFindResponse._id, email: userFindResponse.email };
    const accessToken = generateToken(user);
    logger.info(`token generated for ${JSON.stringify(user)}`);

    res.status(200).json({ accessToken: accessToken });
  } catch (errorFind) {
    logger.error(`error at find user: ${errorFind}`);
    res.status(500).json(errorFind);
  }
};

module.exports = { auth };
