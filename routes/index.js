'use strict';

const express = require('express');
const router = express.Router();

const { login } = require('../process/db-handler');
const { sign } = require('../process/jwt-handler');
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

  if(loginResults) {
    res.json({
      redirect: redirectUrl
    });
  }
  else {
    res.json({status: 'error', data: 'login-failed'});
  }
});

module.exports = router;
