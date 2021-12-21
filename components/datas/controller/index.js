const logger = require('../../../helpers/logger');
const { modelDatas } = require('../models');

const actions = {
  get: async () => await modelDatas.find({}),
  post: async ({ data }) => await modelDatas.insertMany(data),
  put: async ({ data, id }) => {
    await modelDatas.updateOne({ _id: id }, data);
    return await modelDatas.find({ _id: id });
  },
  delete: async ({ id }) => {
    await modelDatas.deleteOne({ _id: id });
    return await modelDatas.find({ _id: id });
  },
};

const dbActions = async (res = Response, options = { action: '', id: '', data: {} }) => {
  const { id, data, action } = options;
  let response;

  logger.info(`@${action} data`);

  try {
    response = await actions[action]({ data, id });

    res.status(200).json(response);
  } catch (error) {
    logger.error(`error getting data ${error}`);
    res.status(400).json(error);
  }
  return response;
};

const dataGetAll = (req = new Request(), res = Response) => {
  const option = { action: 'get' };
  dbActions(res, option);
};

const dataAdd = (req = new Request(), res = Response) => {
  const option = { action: 'post', data: req.body.data };
  dbActions(res, option);
};

const dataUpdateById = (req = new Request(), res = Response) => {
  const option = { action: 'put', id: req.body.id, data: req.body.data };
  dbActions(res, option);
};

const deleteById = (req = new Request(), res = Response) => {
  const option = { action: 'delete', id: req.body.id };
  dbActions(res, option);
};

module.exports = { dataGetAll, dataAdd, dataUpdateById, deleteById };
