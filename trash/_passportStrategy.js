const JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    passport = require('passport');

const User = require('./../models/user'),
    config = require('./../config');

const options = {
    secretOrKey: config.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false
};

function hookJWTStrategy(passport) {
    passport.use(new JWTStrategy(options, function (payload, callback) {
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
}

function passportJwt () {
    hookJWTStrategy(passport);
    return passport.initialize();
}

module.exports = passportJwt;