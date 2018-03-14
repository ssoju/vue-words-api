var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var sequelize = require('sequelize');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var path = require('path');

var hookJWTStrategy = require('./services/passportStrategy');
var app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// parse as urlencode and json
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// hook up the HTTP logger
app.use(morgan('dev'));

// hook up passport
app.use(passport.initialize());


// hook the passport jwt strategy
hookJWTStrategy(passport);


// set the static files location
app.use(express.static(__dirname + '/../public'));

// bundle api routes
var router = require('./routes/api')(passport);
app.use('/api', router);

// home route
app.get('*', function (req, res) {
    ///res.send('Nice meeting you.');
    //res.sendFile(path.join(__dirname, '../public/app/views/index.html'));
    res.json(500, {
        message: ''
    });
});

// start the server
app.listen('8081', function () {
    console.log('Magic happens at http://localhost:8888/! We are all now doomed!');
});