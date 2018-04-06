const passport = require('passport'),
    config = require('../config');

function authenticate() {
    return function (req, res, next) {
        return passport.authenticate('jwt', {session: false}).apply(this, arguments);
    }
}

function allowOnly(accessLevel, callback) {
    return function checkUserRole(req, res) {
        if (!(config.accessLevels[accessLevel] & req.user.role)) {
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }
}

module.exports = function (routes, controller) {
    const router = require('express').Router();

    routes.forEach((item, i) => {
        for (const key in item) {
            if (!item.hasOwnProperty(key)) {
                continue;
            }

            const value = item[key];
            const idx = key.indexOf(':');
            const pairs = [key.substr(0, idx), key.substr(idx + 1)];

            if (typeof value === 'string') {
                router[pairs[0]](pairs[1], controller[value]);
            } else {
                if (value.role) {
                    router[pairs[0]](pairs[1], authenticate(), allowOnly(value.role, controller[value.process]));
                } else {
                    router[pairs[0]](pairs[1], controller[value.process]);
                }
            }

        }
    });
    return router;
};