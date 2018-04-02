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

/*
app.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token,
}));
app.use(passport.initialize());

if (process.env.NODE_ENV !== 'production') {
  app.enable('trust proxy');
}
app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
);
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);

app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

 */

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