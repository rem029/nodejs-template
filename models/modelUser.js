const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchemaInit = {};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    refreshToken: { type: String },
    info: { type: Object },
  },
  { strict: true }
);

userSchema.plugin(mongoosePaginate);

const modelUsers = mongoose.model('user', userSchema, 'users');

module.exports = { modelUsers, userSchemaInit };
