const logger = require('../helpers/logger');
const { generateAccessToken } = require('../middlewares/authToken');
const { modelDatas } = require('../models//modelData');

const actions = {
  get: 'get',
  update: 'update',
  add: 'add',
  delete: 'delete',
};

const dbBasicActions = async (action = '', id = '', data = {}) => {
  let response;
  try {
    switch (action) {
      case actions.get:
        logger.info(`@getting data`);
        response = await modelDatas.find({});
        break;

      case actions.add:
        logger.info(`@adding data ${req.body}`);
        response = await modelDatas.insertMany(req.body);
        break;

      case actions.update:
        logger.info(`@update data ${req.body}`);
        response = await modelDatas.updateOne({ _id: id }, data);
        break;

      default:
        throw new Error('invalid db action.');
    }
  } catch (error) {
    throw new Error(error);
  }
  return response;
};

const dataGetAll = async (req = new Request(), res = Response) => {
  try {
    const dataResponse = await dbBasicActions(actions.get);
    res.status(200).json(dataResponse);
  } catch (error) {
    logger.error(`error getting data ${error}`);
    res.status(400).json(error);
  }
};

const dataAdd = async (req = new Request(), res = Response) => {
  try {
    const dataResponse = await dbBasicActions(actions.get);
    res.status(200).json(dataResponse);
  } catch (error) {
    logger.error(`error adding data ${error}`);
    res.status(400).json(error);
  }
};

const dataUpdateById = async (req = new Request(), res = Response) => {
  try {
    const dataResponse = await dbBasicActions(actions.update, req.params.id, {});
    res.status(200).json(dataResponse);
  } catch (error) {
    logger.error(`error update data ${error}`);
    res.status(400).json(error);
  }
};

module.exports = { dataGetAll, dataAdd };
