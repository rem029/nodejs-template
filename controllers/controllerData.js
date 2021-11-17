const logger = require('../helpers/logger');
const { modelDatas } = require('../models//modelData');

const actions = {
  get: 'get',
  updateById: 'updateById',
  add: 'add',
  deleteById: 'deleteById',
};

const dbActions = async (res = Response, options = { action: '', id: '', data: {} }) => {
  const { id, data, action } = options;
  let response;

  logger.info(`@${action} data`);

  try {
    switch (action) {
      case actions.get:
        response = await modelDatas.find({});
        break;

      case actions.add:
        response = await modelDatas.insertMany(data);
        break;

      case actions.updateById:
        await modelDatas.updateOne({ _id: id }, data);
        response = await modelDatas.find({ _id: id });
        break;

      case actions.deleteById:
        await modelDatas.deleteOne({ _id: id });
        response = await modelDatas.find({ _id: id });
        break;

      default:
        throw new Error('invalid db action.');
    }

    res.status(200).json(response);
  } catch (error) {
    logger.error(`error getting data ${error}`);
    res.status(400).json(error);
  }
  return response;
};

const dataGetAll = (req = new Request(), res = Response) => {
  const option = { action: actions.get };
  dbActions(res, option);
};

const dataAdd = (req = new Request(), res = Response) => {
  const option = { action: actions.add, data: req.body.data };
  dbActions(res, option);
};

const dataUpdateById = (req = new Request(), res = Response) => {
  const option = { action: actions.updateById, id: req.body.id, data: req.body.data };
  dbActions(res, option);
};

const deleteById = (req = new Request(), res = Response) => {
  const option = { action: actions.deleteById, id: req.body.id };
  dbActions(res, option);
};

module.exports = { dataGetAll, dataAdd, dataUpdateById, deleteById };
