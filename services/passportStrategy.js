var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./../models/user'),
    config = require('./../config');

function hookJWTStrategy(passport) {
    var options = {
        secretOrKey: config.secretKey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false
    };

    passport.use(new JWTStrategy(options, function (payload, callback) {

        User.findOne({
            where: {
                email: payload.email
            }
        }).then(function (user) {
            if (!user) {
                callback(Error('no user!!'), false);
                return;
            }

            console.log(callback.toString())
            callback(null, user);
        });

    }));
}

module.exports = hookJWTStrategy;