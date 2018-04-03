const router = require('express').Router();
const UserController = require('../../controllers/userController');
let userController = new UserController();

router.get('/', userController.get);
router.get('/:id', userController.getUserInfo);
router.post('/', userController.post);

module.exports = router;