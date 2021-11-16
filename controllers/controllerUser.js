const { modelUsers } = require('../models/modelUser');
const logger = require('../helpers/logger');

const { generateAccessToken, generateRefreshToken } = require('../middlewares/authToken');

const createUser = async (req = new Request(), res = Response) => {
  try {
    let userCreateResponse = await modelUsers.create(req.body);

    const user = { id: userCreateResponse._id, email: userCreateResponse.email };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await modelUsers.updateOne(
      { email: userCreateResponse.email },
      { refreshToken: refreshToken }
    );

    res.status(200).json({ user, accessToken, refreshToken });
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
  res.status(200).json({ email: userFindResponse.email, info: userFindResponse.info });
};

const getInfoById = async (req = new Request(), res = Response) => {
  res.status(200).json('from user get Info by id');
};

module.exports = { createUser, getInfo, getInfoById };
