const router = require('express').Router(),
    passport = require('passport'),
    config = require('../config');

function authenticate(passport) {
    return function (req, res, next) {
        return passport.authenticate('jwt', {session: false}).apply(this, [req, res, next]);
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
    for(const key in routes) {
        if (!routes.hasOwnProperty(key)) { continue; }

        const item = routes[key];
        let pairs = (function (key) {
            let tmp = key.split(':');
            return [
                tmp.shift(),
                tmp.join('')
            ];
        })(key);

        if (typeof item === 'string') {
            router[pairs[0]](pairs[1], controller[item]);
        } else {
            if (item.role) {
                router[pairs[0]](authenticate(passport), allowOnly(item.role, controller[item.process]));
            } else {
                router[pairs[0]](controller[item.process]);
            }
        }

    }
    return router;
};