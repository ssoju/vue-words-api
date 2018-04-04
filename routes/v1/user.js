const AuthRouter = require('../../middlewares/authRouter');
const UserController = require('../../controllers/userController');

module.exports = function () {
    return AuthRouter({
        'get:/:id': {role: 'user', process: 'getUserInfo'},
        'put:/': {role: 'user', process: 'updateUserInfo'},
        'delete:/:id': {role: 'user', process: 'deleteUser'}
    }, UserController);
};
