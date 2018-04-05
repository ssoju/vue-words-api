const router = require('express').Router(),
    config = require('../config');

function authenticate(passport) {
    return function (req, res, next) {
        return passport.authenticate('jwt', {session: false}).apply(this, [req, res, next]);
    }
}

function allowOnly(accessLevel, callback) {
    return function checkUserRole(req, res) {
        console.log('!!!!', req.originalUrl, accessLevel);
        if (!(config.accessLevels[accessLevel] & req.user.role)) {
            console.log('access error!!', res.originalUrl);
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }
}

module.exports = function (routes, controller, passport) {
    routes.forEach((item, i) => {
        for (const key in item) {
            if (!item.hasOwnProperty(key)) {
                continue;
            }


            const value = item[key];
            const idx = key.indexOf(':');
            const pairs = [key.substr(0, idx), key.substr(idx + 1)];

            console.log(pairs);

            if (typeof value === 'string') {
                router[pairs[0]](pairs[1], controller[value]);
            } else {
                if (value.role) {
                    router[pairs[0]](pairs[1], authenticate(passport), allowOnly(value.role, controller[value.process]));
                } else {
                    router[pairs[0]](pairs[1], controller[value.process]);
                }
            }

        }
    });
    return router;
};