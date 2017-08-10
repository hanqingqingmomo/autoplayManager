var mongoose = require('mongoose');
var Autoplay = mongoose.model('Autoplay');

var schedule = require('node-schedule');
var socket = require('socket.io-client');

module.exports = {

  cancel: function(req,res,next){
    var name = req.body.name
      var my_job = schedule.scheduledJobs[name]
      if (my_job){
        my_job.cancel()
      }
    res.send('respond with a resource');
  },

  find: function(req,res,next){


          var date = new Date(Date.now()+100000);
          
          console.log("========", date)

          var job = schedule.scheduleJob("sdfsdf", date, function(){


              var params = {"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"}

              var connection = socket.connect("https://wrtc21.bigmarker.com", {
                secure: true,
                query:  "uid=3958f03e6d28&rid=d9537b7eeca2" 
              });

            if (connection.connected == true) {
              connection.emit('videoShare:load', params);
            } else {
              connection.on('connect', function(){
                connection.emit('videoShare:load', params);
              });
            }

          });


      //var ab = socket.connect("https://wrtc21.bigmarker.com", {
        //secure: true,
        //query: "uid=3958f03e6d28&rid=5935cbf99fcd"
      //});

    //if (ab.connected){
        //ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"});

    //}else {
      //ab.on('connect', function(){
        //console.log("=======", ab)

          //ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"})

      //});
    //}

    res.send('respond with a resource');

  },

  list: function(req,res,next){

    Autoplay.find({}).lean().exec(function(err,docs){
      if (err){
        res.end('Error');
        return next();
      }
      res.end(JSON.stringify(docs));
    });

  },

  create: function(req, res, next){
     console.log("====", req.body);
     var autoplay = new Autoplay(req.body)
      autoplay.save(function(err, autoplay){
        if (err){
          res.json(err);
          return next();
        } else {

          var name = autoplay.conferenceId;
          var date = new Date(autoplay.startTime * 1000);
          var params = req.body;
          //var date = new Date(Date.now()+50000);

          console.log("============", date);
          console.log("============", params);

          var job = schedule.scheduleJob(name, date, function(){

              var connection = socket.connect(autoplay.serverUrl, {
                secure: true,
                query:  autoplay.keys
              });

            if (connection.connected == true) {
              console.log("------------1111")
              connection.emit('videoShare:load', params);
              Autoplay.update({_id: autoplay._id},{$set:{sendStatus: 1}},function(err){
                if (err){
                  console.log("===========", err);
                }
              });
            } else {
              connection.on('connect', function(){
                console.log("------------222")
                  connection.emit('videoShare:load', params);

                Autoplay.update({_id: autoplay._id},{$set:{sendStatus: 1}},function(err){
                  if (err){
                    console.log("===========", err);
                  }
                });
              });
            }

          });

          res.json({status: 1});
        }
      });

  }

}
