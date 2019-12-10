'use strict';

const Bcrypt  = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = mongoose.model('account', new Schema({
  username: String,
  password: String,
  phone: String,
  email: String,
}));

const login = async (email, password) => {
  const loginResults = await account.findOne({email}, '_id password roles');
  const passwordVerification = await Bcrypt.compare(password, loginResults.password);
  return passwordVerification && loginResults;
}

module.exports = {
  login
};