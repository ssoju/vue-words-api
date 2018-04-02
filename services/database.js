const config = require('../config'),
    Sequelize = require('sequelize'),
    dbInfo = config.db.local,

    db = new Sequelize(
        dbInfo.name,
        dbInfo.user,
        dbInfo.password,
        dbInfo.connection
    );

function normalize(fields) {
    for(const field in fields) {
        for(const attr in fields[field]) {
            if (attr === 'type') {
                fields[field][attr] = Sequelize[fields[field][attr].toUpperCase()];
                break;
            }
        }
    }

    return fields;
}

db.defineModel = function (name, attrs) {
    let fields = attrs.fields || {};
    const hooks = attrs.hooks || {};
    const methods = attrs.methods || {};

    fields = normalize(fields);

    const Model = db.define(name, fields, {
        hooks: hooks
    });

    Object.assign(Model.prototype, methods);
    return Model;
};

module.exports = db;