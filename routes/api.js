var { Router } = require('express');
var config = require('../config');
// var { allowOnly }  = require('../services/routesHelper');


const router = Router();

router.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

function authenticate(passport) {
    return function () {
        const result = passport.authenticate('jwt', {session: false}).apply(this, arguments);
        return result;
    }
}

function allowOnly(accessLevel, callback) {
    return function checkUserRole(req, res) {
        if (!(accessLevel & req.user.role)) {
            res.sendStatus(403);
            return;
        }

        callback(req, res);
    }
}

var APIRoutes = function (passport) {

    router.post('/auth/register', require('../controllers/authController').signUp);
    router.post('/auth/login', require('../controllers/authController').authenticateUser);

    // GET Routes.
    router.get('/profile',
        authenticate(passport),
        allowOnly(config.accessLevels.user, require('../controllers/userController').index)
    );

    router.get('/admin',
        authenticate(passport),
        allowOnly(config.accessLevels.admin, require('../controllers/adminController').index)
    );

    return router;
};

module.exports = APIRoutes;