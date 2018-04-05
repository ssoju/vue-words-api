const AuthRouter = require('../../middlewares/authRouter');
const AuthController = require('../../controllers/authController');

module.exports = function (passport) {
    return AuthRouter([
        {'post:/login': 'signIn'},
        {'post:/signin': 'signIn'},
        {'post:/register': 'signUp'},
        {'post:/signuo': 'signUp'},
        {'get:/signout': {role: 'user', process: 'signOut'}}
    ], AuthController, passport);
};