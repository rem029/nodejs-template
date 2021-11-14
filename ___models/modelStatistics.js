const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const statsSchemaInit = {};

const statsSchema = new mongoose.Schema({}, { strict: false });

statsSchema.plugin(mongoosePaginate);

const modelStats = mongoose.model('statistic', statsSchema, 'statistics');

module.exports = { modelStats, statsSchemaInit };
