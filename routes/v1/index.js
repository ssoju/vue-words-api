const router = require('express').Router();

module.exports = function () {

    router.use('/auth', require('./auth')());
    router.use('/users', require('./user')());
    router.use('/words', require('./user')());

    return router;
}
