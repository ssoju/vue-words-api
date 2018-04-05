const AuthRouter = require('../../middlewares/authRouter');
const WordController = require('../../controllers/wordController');

module.exports = AuthRouter([
    // {'get:/': {role:'user', process: 'getWords'}},
    {'get:/:id?': {role:'user', process: 'getWords'}},
    {'put:/:id': {role: 'user', process: 'updateWord'}},
    {'delete:/:id': {role: 'user', process: 'deleteWord'}}
], WordController);
