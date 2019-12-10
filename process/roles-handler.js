'use strict';

const manageRoles = (loginResults) => {
  const { roles } = loginResults._doc;
  if(roles.indexOf('root')>-1) {
    return 'root';
  }
  else if(roles.indexOf('user')>-1) {
    return 'user';
  }
  else {
    return 'access-denied';
  }
};

module.exports = {
  manageRoles
};