var jwt = require('jsonwebtoken'),
    config = require('../config'),
    db = require('../services/database'),
    User = require('../models/user');

// The authentication controller.
var AuthController = module.exports = {};

// Register a user.
AuthController.signUp = function (req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(404).json({
            message: 'Please provide a username and a password.'
        });
    } else {
        var {email, password, nickname} = req.body;

        return User.create({email, password, nickname}).then(function (addedData) {
            res.status(200).json({
                success: true,
                data: {
                    email: addedData.email,
                    role: addedData.role
                }
            });
            /*res.status(201).json({
                message: 'Account created!'
            });
            console.log(arguments);

            User.findOne({
                where: {
                    email
                }
            }).then((user) => {
                delete user.password;
                delete user.updatedAt;

                res.status(200).json({
                    success: true,
                    data: user
                });
            });*/
        }).catch(function (error) {
            console.log(error);
            //utils.jsonError(req, res, error);
            res.status(500).json({
                message: 'There was an error!'
            });
        });
    }
};

AuthController.authenticateUser = function (req, res) {
    var {email, password} = req.body;

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
                        var token = jwt.sign(
                            {
                                email: user.email,
                                role: user.role
                            },
                            config.secretKey//,
                            //{expiresIn: '30m'}
                        );

                        res.json({
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
}