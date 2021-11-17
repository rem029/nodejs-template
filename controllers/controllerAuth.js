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
    if (!passwordCompare(password, userFindResponse.password))
      return res.status(401).json('invalid password.');

    const userFound = { id: userFindResponse._id, email: userFindResponse.email };

    const accessToken = generateAccessToken(userFound);
    const refreshToken = generateRefreshToken(userFound);
    logger.info(`token generated for ${JSON.stringify(userFound)}`);

    await modelUsers.updateOne(
      { email: userFindResponse.email },
      { refreshToken: refreshToken }
    );

    const serverResponse = { accessToken: accessToken, refreshToken: refreshToken };
    res.status(200).json(serverResponse);
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

    const serverResponse = {
      id: userFindResponse._id,
      email: userFindResponse.email,
      refreshToken: userFindResponse.refreshToken,
    };

    res.status(200).json(serverResponse);
  } catch (error) {
    logger.error(`error @refresh token ${refreshToken}`);
    res.status(500).json(error);
  }
};

const destroyToken = async (req = new Request(), res = Response) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).json('Token not found');

    const updateResponse = await modelUsers.updateOne(
      { refreshToken: refreshToken },
      { refreshToken: '' }
    );
    if (!updateResponse) return res.status(401).json('Token not found');

    const serverResponse = {
      id: updateResponse._id,
      email: updateResponse.email,
      refreshToken: updateResponse.refreshToken,
    };

    res.status(200).json(serverResponse);
  } catch (error) {
    logger.error(`error @refresh token ${refreshToken}`);
    res.status(500).json(error);
  }
};

module.exports = { auth, refreshToken, destroyToken };
