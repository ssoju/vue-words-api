var WordController = {
    index: function(req, res) {
        console.log('user index', req);
        res.json({ message: 'Welcome to the users area ' + req.user.email + '!' });
    }
};

module.exports = WordController;