var bcrypt = require('bcrypt'),
    config = require('../config'),
    db = require('../services/database');


var UserModel = db.defineModel('user', {
    fields: {
        email: {
            type: 'string',
            unique: true,
            allowNull: false
        },

        password: {
            type: 'string',
            allowNull: false
        },

        nickname: {
            type: 'string',
            allowNull: false
        },

        role: {
            type: 'integer',
            defaultValue: config.userRoles.user
        },

        createdAt: {type: 'date'},

        updatedAt: {type: 'date'}
    },
    hooks: {
        beforeValidate: function hashPassword(user) {
            if(user.changed('password')) {
                return bcrypt.hash(user.password, 10).then(function(password) {
                    user.password = password;
                });
            }
        }
    },
    methods: {
        comparePasswords: function comparePasswords(password, callback) {
            bcrypt.compare(password, this.password, function (error, isMatch) {
                if (error) {
                    return callback(error);
                }

                return callback(null, isMatch);
            });
        }
    }
});

module.exports = UserModel;