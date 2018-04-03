const express = require('express'),
    router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./user'));
//router.use('/posts', require(ROUTE_V1_PATH + 'post'));

module.exports = router;