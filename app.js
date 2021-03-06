const express      = require('express');
const logger       = require('morgan');
const bodyParser   = require('body-parser');
const passport     = require('passport');
const v1 = require('./routes/v1');
const app = express();

require('dotenv').config();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Authorization, Content-Type, Access-Control-Allow-Headers');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware

    res.setHeader('Access-control-expose-headers', 'Authorization');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

// hook up passport
app.use(passport.initialize());

require('./middlewares/hookPassport')(passport);

app.use('/api/v1', v1());

app.use('/', function(req, res){
    res.statusCode = 200;//send the appropriate status code
    res.json({status:"success", message:"welcome to words API", data:{}})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500).json({success: false, error: err.toString()});
    ////onsole.log(err);
    ///res.render('error');
});

// start the server
app.listen(process.env.PORT, function () {
    console.log(`Magic happens at http://localhost:${process.env.PORT}/! We are all now doomed!`);
});