var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Conference = mongoose.model('Conference');

var io = require('socket.io-client');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/conference', function(req, res, next) {

  console.log("========", req.body)

  //var connect = io.connect("https://wrtc21.bigmarker.com", {
    //secure: true,
    //forceNew: true,
    //query: 'uid=3219c5f933b6&rid=a5167495fb0d'
  //});

  //socket.on('connect', function(){
    //console.log("=======", connect)
  //});
  

  //var connect = io.connect("https://wrtc21.bigmarker.com",{
    //secure: true,
    //query: "uid=3219c5f933b6&rid=a5167495fb0d"
  //});



  //connect.emit('videoShare:load', {
    //youtubeLink: "https://www.youtube.com/watch?v=z53UT7UFQh0",
    //isMuted: 0,
    //playingState: "-1",
    //eventTime: Date.now(),
    //elapseTime: 0,
    //volume: 100,
    //playingState: "1",
    //autoplay: 999,
    //startAt: 0
  //})

    Conference.find({}, function(err,docs){
      if (err){
        res.end('Error');
        return next();
      }
      res.json(docs);
    });

});

module.exports = router;
