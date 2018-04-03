const router = require('express').Router();
const AuthController = require('../../controllers/authController');
let authController = new AuthController();

router.get('/login', authController.signIn);
router.get('/signin', authController.signIn);
router.get('/register', authController.signUp);
router.post('/signup', authController.signUp);
router.post('/signout', authController.signOut);

module.exports = router;