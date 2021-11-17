const { modelUsers } = require('../models/modelUser');
const logger = require('../helpers/logger');

const { generateAccessToken, generateRefreshToken } = require('../middlewares/authToken');

const createUser = async (req = new Request(), res = Response) => {
  try {
    const userCreateResponse = await modelUsers.create(req.body);
    const user = { id: userCreateResponse._id, email: userCreateResponse.email };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await modelUsers.updateOne(
      { email: userCreateResponse.email },
      { refreshToken: refreshToken }
    );

    const serverResponse = { user, accessToken, refreshToken };
    res.status(200).json(serverResponse);
  } catch (errorCreate) {
    logger.error(`error creating user ${errorCreate}`);
    res.status(400).json(errorCreate);
  }
};

const getInfo = async (req = new Request(), res = Response) => {
  const userFindResponse = await modelUsers.findOne({
    _id: req.user.id,
    email: req.user.email,
  });
  if (!userFindResponse) return res.status(401).json('User not found');
  const serverResponse = { email: userFindResponse.email, info: userFindResponse.info };
  res.status(200).json(serverResponse);
};

const getInfoById = async (req = new Request(), res = Response) => {
  res.status(200).json('from user get Info by id');
};

module.exports = { createUser, getInfo, getInfoById };
