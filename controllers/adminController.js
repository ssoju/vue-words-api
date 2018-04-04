var AdminController = {
    index: function(req, res) {
        res.status(200).json({ message: 'Welcome to the admin area ' + req.user.email + '!' });
    },
    signIn: function (req, res, next) {

    },
    signUp: function (req, res, next) {

    },
    signOut: function (req, res, next) {

    }
};

module.exports = AdminController;