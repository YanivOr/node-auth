'use strict';

const express = require('express');
const router = express.Router();

const { login } = require('../process/db-handler');
const { sign, verify } = require('../process/jwt-handler');
const { manageRoles } = require('../process/roles-handler');

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  
  const loginResults = await login(email, password);
  const role = manageRoles(loginResults);
  const token = sign(loginResults);

  let redirectUrl;

  switch (role) {
    case 'root': 
      redirectUrl = `http://127.0.0.1:8081?token=${token}`;
      break;
    case 'user': 
      redirectUrl = `http://127.0.0.1:8082?token=${token}`;
      break;
    default:
      redirectUrl = `http://127.0.0.1:8083`;
      break;
  }

  if (loginResults && token) {
    res.json({
      status: 'success',
      redirect: redirectUrl
    });
  } else {
    res.status(500).json({status: 'error', data: 'login-failed'});
  }
});

router.get('/verify', ({ headers: { authorization }}, res) => {
  const token = authorization.slice(7, authorization.length); // Remove Bearer from string
  const results = verify(token)

  if (results) {
    res.json({status: 'success'});
  } else {
    res.status(500).json({status: 'error', data: 'verification-failed'});
  }
});

module.exports = router;
