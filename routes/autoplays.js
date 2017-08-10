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

router.post('/cancle', function(req, res, next) {

  var name = req.body.name
  var my_job = schedule.scheduledJobs[name]
  if (my_job){
    my_job.cancel()
  }

  res.send('respond with a resource');

});


router.get('/find', function(req, res, next) {

  var conferenceId = req.query.id
    Autoplay.findOne({conferenceId: conferenceId}, function(err,autoplay){

      console.log("=====", autoplay)

        //if (autoplay){


          var ab = socket.connect("https://wrtc21.bigmarker.com", {
  secure: true,
  query: "uid=3958f03e6d28&rid=33b4fdc6e086"
});

ab.on('connect', function(){
  console.log("=======", ab)

    ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"})
});


          //var connection = socket.connect(autoplay.serverUrl, {
            //secure: true,
            //query:  autoplay.keys
          //});

          //connection.on('connect', function(){
            //console.log("-----------------------------")
              //console.log("------------", JSON.stringify(autoplay))
              //connection.emit('videoShare:load', JSON.stringify(autoplay))
              //Autoplay.update({_id: autoplay._id},{$set:{sendStatus: 1}},function(err){
                //if (err){
                  //console.log("===========", err);
                //}
              //});
          //});

       // }
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

        console.log("++++++++++++++++++++++++", JSON.stringify(autoplay))
        console.log("++++++++++++++++++++++++", autoplay.keys)
        console.log("++++++++++++++++++++++++", autoplay.serverUrl)

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
      res.json({status: 1});
    }
  });

});

module.exports = router;
