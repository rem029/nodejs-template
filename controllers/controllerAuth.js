const { modelUsers } = require('../models/modelUser');
const logger = require('../helpers/logger');

const { generateAccessToken, generateRefreshToken } = require('../middlewares/authToken');
const { passwordCompare } = require('../middlewares/authUser');

const auth = async (req = new Request(), res = Response) => {
  try {
    logger.info(`@auth controller user for ${JSON.stringify(req.user.email)}`);

    const { email, password } = req.user;

    const userFindResponse = await modelUsers.findOne({
      email: email,
    });

    if (!userFindResponse) return res.status(401).json('invalid email.');

    const isPasswordEqual = passwordCompare(password, userFindResponse.password);

    if (!isPasswordEqual) return res.status(401).json('invalid password.');

    const user = { id: userFindResponse._id, email: userFindResponse.email };

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await modelUsers.updateOne(
      { email: userFindResponse.email },
      { refreshToken: refreshToken }
    );

    logger.info(`token generated for ${JSON.stringify(user)}`);

    res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (errorFind) {
    logger.error(`error at find user: ${errorFind}`);
    res.status(500).json(errorFind);
  }
};

const refreshToken = async (req = new Request(), res = Response) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).json('Token not found');

    const userFindResponse = await modelUsers.findOne({ refreshToken: refreshToken });
    if (!userFindResponse) return res.status(401).json('Token not found');

    res.status(200).json({ refreshToken: userFindResponse });
  } catch (error) {
    logger.error(`error @refresh token ${refreshToken}`);
    res.status(500).json(error);
  }
};

module.exports = { auth, refreshToken };
