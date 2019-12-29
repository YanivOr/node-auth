'use strict';

const fs   = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY  = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const publicKEY  = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8');

const issuer  = process.env.ISSUER;
const subject  = process.env.SUBJECT;
const audience  = process.env.AUDIENCE;
const expiresIn = process.env.EXPIRESIN;

const signOptions = {
  issuer,
  subject,
  audience,
  expiresIn,
  algorithm: 'RS256'
};

const verifyOptions = {
  ...signOptions,
  algorithm: ['RS256']
};

const sign = (data) => {
  const { _id, password } = data;

  const payload = {
    _id,
    password
  };
    
  try {
    const token = jwt.sign(payload, privateKEY, signOptions);
    return token;
  }
  catch (e) {
    return false;
  }
};

const verify = (token) => {
  try {
    const verification = jwt.verify(token, publicKEY, verifyOptions);
    return verification;
  }
  catch (e) {
    return false;
  }
}

module.exports = {
  sign,
  verify,
};
