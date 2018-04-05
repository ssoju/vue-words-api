const JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('./../models/user'),
    config = require('./../config');

function hookPassport (passport) {
    passport.use(new JWTStrategy({
        secretOrKey: config.secretKey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false
    }, function (payload, callback) {
        User.findOne({
            where: {
                email: payload.email
            }
        }).then(function (user) {
            if (!user) {
                callback(new Error('no user!!'), false);
                return;
            }
            callback(null, user);
        });
    }));

    return passport.initialize();
}

module.exports = hookPassport;