var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Autoplay = mongoose.model('Autoplay');

var schedule = require('node-schedule');

var io = require('socket.io-client');
var socket = require('socket.io-client');

router.get('/list', function(req, res, next) {

    Autoplay.find({}).lean().exec(function(err,docs){
      if (err){
        res.end('Error');
        return next();
      }
      console.log("=======",docs)
      console.log("=======",JSON.stringify(docs))
      res.end(JSON.stringify(docs));
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
      res.json(err);
      return next();
    } else {

      var name = autoplay.conferenceId;
      var date = new Date(autoplay.startTime * 1000);
      console.log("=================", date);

      var job = schedule.scheduleJob(name, date, function(){

        console.log("++++++++++++++++++++++++")

        var connection = socket.connect(autoplay.serverUrl, {
          secure: true,
          query:  autoplay.keys
        });

        connection.on('connect', function(){
          console("-----------------------------")
          connection.emit('videoShare:load', JSON.stringify(autoplay))
          Autoplay.update({_id: autoplay._id},{$set:{sendStatus: 1}},function(err){
           if (err){
             console.log("===========", err);
           }
          });
        });

      });
      res.json({status: 1});
    }
  });

});

module.exports = router;
