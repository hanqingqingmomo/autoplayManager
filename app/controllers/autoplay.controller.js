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


    var id = req.query.id

    if (id==1){
       var ab = socket.connect("https://wrtc21.bigmarker.com", {
      secure: true,
      query: "uid=3958f03e6d28&rid=85ccb4615f86"
    });

        ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"});

    }else {
       var ab = socket.connect("https://wrtc21.bigmarker.com", {
      secure: true,
      query: "uid=3958f03e6d28&rid=85ccb4615f86"
    });


    console.log("=======", ab.connected)


    ab.on('connect', function(){
      console.log("=======", ab)

        ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"})

    });
    }

   

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
     var autoplay = new Autoplay(req.body)
      autoplay.save(function(err, autoplay){
        if (err){
          res.json(err);
          return next();
        } else {

          var name = autoplay.conferenceId;
          var date = new Date(autoplay.startTime * 1000);

          var job = schedule.scheduleJob(name, date, function(){

            console.log("++++++++++++++++++++++++", JSON.stringify(autoplay))

              var connection = socket.connect(autoplay.serverUrl, {
                secure: true,
                query:  autoplay.keys
              });


            if connection.connected {
              console.log("------------1111", JSON.stringify(autoplay))
              connection.emit('videoShare:load', JSON.stringify(autoplay));
              Autoplay.update({_id: autoplay._id},{$set:{sendStatus: 1}},function(err){
                if (err){
                  console.log("===========", err);
                }
            } else {
              connection.on('connect', function(){
                console.log("------------222", JSON.stringify(autoplay))
                  connection.emit('videoShare:load', JSON.stringify(autoplay));

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
