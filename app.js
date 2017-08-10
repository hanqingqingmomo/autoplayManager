var express = require('express');
var schedule = require("node-schedule");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('./config/mongoose.js');
var db = mongoose();

//var index = require('./routes/index');
//var users = require('./routes/users');
//var autoplays = require('./routes/autoplays');

var mongoose = require('mongoose');
var Autoplay = mongoose.model('Autoplay');

var schedule = require('node-schedule');
var socket = require('socket.io-client');

var app = express();

require('./app/routes/autoplay.routes')(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);
//app.use('/autoplays', autoplays);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


Autoplay.find({sendStatus: 0}).stream()
  .on('data', function(autoplay){
     var name = autoplay.conferenceId;
     var date = new Date(autoplay.startTime * 1000);

     var job = schedule.scheduleJob(name, date, function(){
        console.log("++++++++++++++++++++++++", JSON.stringify(autoplay))
        var connection = socket.connect(autoplay.serverUrl, {
          secure: true,
          query:  autoplay.keys
        });

        connection.on('connect', function(){
          console.log("-----------------------------")
          console.log("------------", JSON.stringify(autoplay))
          connection.emit('videoShare:load', JSON.stringify(autoplay))
          Autoplay.update({_id: autoplay._id},{$set:{sendStatus: 1}},function(err){
           if (err){
             console.log("===========", err);
           }
          });
        });

      });
  })
  .on('error', function(err){
    // handle error
  })
  .on('end', function(){
    // final callback
  });





module.exports = app;
