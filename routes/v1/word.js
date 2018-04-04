const AuthRouter = require('../../middlewares/authRouter');
const WordController = require('../../controllers/wordController');

module.exports = function () {
    return AuthRouter({
        'get:/': 'getWords',
        'get:/:id': 'getWords',
        'put:/': {role: 'user', process: 'updateWord'},
        'delete:/:id': {role: 'user', process: 'deleteWord'}
    }, WordController);
};
