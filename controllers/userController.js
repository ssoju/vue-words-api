var UserController = {
    index (req, res) {
        console.log('user index', req);
        res.json({ message: 'Welcome to the users area ' + req.user.email + '!' });
    },

    getUserInfo (req, res) {
        res.json({
            success: true,
            data: {}
        });
    },

    updateUserInfo (req, res) {

    },

    deleteUser (req, res) {

    }
};

module.exports = UserController;