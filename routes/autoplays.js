var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Autoplay = mongoose.model('Autoplay');

var schedule = require('node-schedule');

var io = require('socket.io-client');

router.get('/list', function(req, res, next) {

    Autoplay.find({}, function(err,docs){
      if (err){
        res.end('Error');
        return next();
      }
      res.json(docs);
    });

});

router.get('/cancle', function(req, res, next) {

  var name = req.query.name
  var my_job = schedule.scheduledJobs[name]
  if (my_job){
    my_job.cancel()
  }

  res.send('respond with a resource');

});


router.get('/test', function(req, res, next) {


  console.log("==========", req.query.date)
  var date = req.query.date
  var d = new Date("2017-08-04 14:26:00")


  console.log("==========", d)
  var j = schedule.scheduleJob("test", d, function(){
    console.log('The world is going to end today.');
  });

  res.send('respond with a resource');


});

router.post('/create', function(req, res, next) {
  console.log("========", req.body)
  var autoplay = new Autoplay(req.body)
  autoplay.save(function(err, autoplay){
    if (err){
      //res.end('error');
      res.json(err);
      return next();
    } else {
      var name = autoplay.conferenceId 
      console.log("=================", autoplay.startTime);
      var job = schedule.scheduleJob(name, autoplay.startTime, function(){
        console.log('The world is going to end today.');
      });
      res.json({status: 1});
    }
  });

});

module.exports = router;
