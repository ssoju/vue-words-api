var config = module.exports;

config.serverPort = 8081;

const userRoles = config.userRoles = {
    guest: 1,
    user: 2,
    admin: 4
};

//config.db = require('../db.config');
config.db = {
    local: {
        user: 'comahead',
        password: 'rock1014',
        name: 'worddb',
        connection: {
            host: 'maru.zone',
            port: '3306',
            dialect: 'mysql'
        }
    }
};

config.secretKey = 'comahead';

config.accessLevels = {
    guest: userRoles.guest | userRoles.user | userRoles.admin,
    user: userRoles.user | userRoles.admin,
    admin: userRoles.admin
};
