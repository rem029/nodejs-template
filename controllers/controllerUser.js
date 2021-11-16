const { modelUsers } = require('../models/modelUser');
const logger = require('../helpers/logger');

const createUser = async (req = new Request(), res = Response) => {
  try {
    let userCreateResponse = await modelUsers.create(req.body);
    res.status(200).json(userCreateResponse);
  } catch (errorCreate) {
    logger.error(`error creating user ${errorCreate}`);
    res.status(400).json(`${errorCreate}`);
  }
};

const getInfo = async (req = new Request(), res = Response) => {
  res.status(200).json('from user get Info');
};

const getInfoById = async (req = new Request(), res = Response) => {
  res.status(200).json('from user get Info by id');
};

module.exports = { createUser, getInfo, getInfoById };
