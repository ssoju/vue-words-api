const router = require('express').Router();

module.exports = function (passport) {

    router.use('/auth', require('./auth')(passport));
    router.use('/users', require('./user')(passport));
    router.use('/words', require('./word')(passport));

    return router;
};

/*
With regex

app.get('/articles/:year?/:month?/:day?', function(req, res) {
  var year = req.query.year; //either a value or undefined
  var month = req.query.month;
  var day = req.query.day;
}
Without regex

var getArticles = function(year, month, day) { ... }

app.get('/articles/:year', function(req, res) {
  getArticles(req.params.year);
}
app.get('/articles/:year/:month', function(req, res) {
  getArticles(req.params.year, req.params.month);
}
app.get('/articles/:year/:month/:day', function(req, res) {
  getArticles(req.params.year, req.params.month, req.params.day);
}
Define the 3 paths you want to support and reuse the same function

With Query Params

app.get('/articles', function(req, res) {
  var year = req.query.year; //either a value or undefined
  var month = req.query.month;
  var day = req.query.day;
}
 */
