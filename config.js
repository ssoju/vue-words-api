var config = module.exports;
const userRoles = config.userRoles = {
    guest: 1,
    user: 2,
    admin: 4
};

config.db = require('../db.config');

config.secretKey = 'comahead';

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,
    user: userRoles.user | userRoles.admin,
    admin: userRoles.admin
};
