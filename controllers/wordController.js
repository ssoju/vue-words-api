const WordModel = require('../models/word');
const Op = require('sequelize').Op;

const WordController = {
    index (req, res) {
        res.json({ message: 'Welcome to the users area ' + req.user.email + '!' });
    },

    getWords (req, res) {
        const {id} = req.params;
        const {lastId, keyword} = req.query;

        if (id) {
            WordModel.findOne({
                where: {
                    id: id
                }
            }).then((word) => {
                res.json({
                    success: true,
                    data: word
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: "There was an error!"
                });
            });
        } else {
            WordModel.findAll({
                where: {
                    /*word: {
                        [Op.like]: '%' + keyword + '%'
                    },*/
                    id: {
                        [Op.gt]: lastId || 0
                    }
                },
            }).then((words) => {
                res.json({
                    success: true,
                    data: words
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: "There was an error!"
                });
            });
        }
     },

    updateWord (req, res) {

    },

    deleteWord (req, res) {

    }
};

module.exports = WordController;