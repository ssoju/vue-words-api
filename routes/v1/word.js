const AuthRouter = require('../../middlewares/authRouter');
const WordController = require('../../controllers/wordController');

module.exports = function () {
    return AuthRouter({
        'get:/:id': {role: 'user', process: 'getWords'},
        'put:/': {role: 'user', process: 'updateWord'},
        'delete:/:id': {role: 'user', process: 'deleteWord'}
    }, new WordController());
};
