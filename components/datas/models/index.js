const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const dataSchemaInit = {};

const dataSchema = new mongoose.Schema(dataSchemaInit, { strict: false });

dataSchema.plugin(mongoosePaginate);

const modelDatas = mongoose.model('data', dataSchema, 'datas');

module.exports = { modelDatas, dataSchemaInit };
