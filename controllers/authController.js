const jwt = require('jsonwebtoken'),
    config = require('../config'),
    User = require('../models/user');

// The authentication controller.
var AuthController = module.exports = {};

// Register a user.
AuthController.signUp = function (req, res) {
    const {email, password, nickname} = req.body;

    if (!email || !password) {
        res.status(404).json({
            message: 'Please provide a username and a password.'
        });
    } else {
        return User.create({email, password, nickname}).then(function (addedData) {
            res.status(200).json({
                success: true,
                data: {
                    email,
                    role: addedData.role
                }
            });
        }).catch(function (error) {
            res.status(500).json({
                message: 'There was an error!'
            });
        });
    }
};

AuthController.signIn = function (req, res) {
    const {email, password} = req.body;

    res.set('Authorization', '');

    if (!email || !password) {
        res.status(404).json({
            message: 'Username and password are needed!'
        });
    } else {

        User.findOne({
            where: {
                email
            }
        }).then((user) => {
            if (!user) {
                res.status(404).json({
                    message: 'Authentication failed!'
                });
            } else {
                user.comparePasswords(password, function (error, isMatch) {
                    if (isMatch && !error) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                nickname: user.nickname,
                                role: user.role
                            },
                            config.secretKey//, {expiresIn: '30m'}
                        );

                        res.set('Authorization', 'Bearer ' + token).json({
                            success: true,
                            token: token
                        });
                    } else {
                        res.status(404).json({
                            message: 'Login failed!'
                        });
                    }
                });
            }
        }).catch(function (error) {
            console.log(error);
            res.status(500).json({
                message: 'There was an error!'
            });
        });
    }
};

AuthController.signOut = function (req, res) {
    res.json({
        success: true,
    });
};

AuthController.userInfo = function (req, res) {
    res.json({
        success: true,
        data: {
            email: req.user.email,
            nickname: req.user.nickname,
            role: req.user.role
        }
    });
    /*User.findOne({
        where: {
            email: req.user.email
        }
    }).then((user) => {
        if (!user) {
            res.set('Authorization', '');
            res.status(404).json({
                message: 'Authentication failed!'
            });
        } else {
            delete user.password;

            res.json({
                success: true,
                data: {
                    email: user.email,
					nickname: user.nickname,
					role: user.role
                }
            });
        }
    });*/
};
