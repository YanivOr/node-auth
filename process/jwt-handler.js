'use strict';

const fs   = require('fs');
const jwt = require('jsonwebtoken');

const privateKEY  = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const publicKEY  = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8');

const issuer  = process.env.IISUSER;
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
  issuer,
  subject,
  audience,
  expiresIn,
  algorithm: ['RS256']
 };

/*
const getJWT = (id) => {

  // Sign
  const token = jwt.sign(payload, privateKEY, signOptions);
  console.log("Token - " + token);

  // Verify
  const verification = jwt.verify(token, publicKEY, verifyOptions);
  console.log("\nJWT verification result: " + JSON.stringify(verification));

  // Decode
  const decoded = jwt.decode(token, {complete: true});
  console.log("\nDecoded: " + JSON.stringify(decoded));
};
*/

const sign = (data) => {
  const { _id, password } = data;

  const payload = {
    _id,
    password
  };

  const token = jwt.sign(payload, privateKEY, signOptions);
  return token;
};

module.exports = {
  sign
};