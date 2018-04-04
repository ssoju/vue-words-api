const router = require('express').Router(),
    passport = require('passport'),
    config = require('../../config');

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
    let args = [];

    for(const key in routes) {
        if (!routes.hasOwnProperty(key)) { continue; }

        const item = routes[key];
        let pairs = key.split(':');


        if (typeof item === 'string') {
            router[pairs[0]].apply(router, [pairs[1], controller[item]]);
        } else {
            args.push(pairs[1]); // url

            if (item.role) {
                args.push(authenticate(passport));
                args.push(allowOnly(item.role, controller[item.process]));
            } else {
                args.push(controller[item.process]);
            }
            router[pairs[0]].apply(router, args);
        }

    }
    return router;
};