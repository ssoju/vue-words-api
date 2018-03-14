var config = require('../config'),
    Sequelize = require('sequelize'),
    dbInfo = config.db.local,

    db = new Sequelize(
        dbInfo.name,
        dbInfo.user,
        dbInfo.password,
        dbInfo.connection
    );

function normalize(fields) {
    for(var field in fields) {
        for(var attr in fields[field]) {
            if (attr === 'type') {
                fields[field][attr] = Sequelize[fields[field][attr].toUpperCase()];
                break;
            }
        }
    }

    return fields;
}

db.defineModel = function (name, attrs) {
    var fields = attrs.fields || {};
    var hooks = attrs.hooks || {};
    var methods = attrs.methods || {};

    fields = normalize(fields);

    var Model = db.define(name, fields, {
        hooks: hooks
    });

    Object.assign(Model.prototype, methods);
    return Model;
};

module.exports = db;