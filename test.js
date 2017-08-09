var sc = require('socket.io-client');
var ab = sc.connect("https://wrtc-test1.bigmarker.com", {
  secure: true,
  query: "uid=3958f03e6d28&rid=3d81ae725617"
});

ab.on('connect', function(){
  console.log("=======", ab)

    ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=5mHUzJzBQsY","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"3d81ae725617","serverUrl":"https://wrtc-test1.bigmarker.com","keys":"uid=3958f03e6d28&rid=3d81ae725617","volume":"100","startAt":0,"startTime":1502262900,"_id":"598ab1ee602a66316ad7f2d5","sendStatus":"0"})
});

ab.on('connect_failed', function(){
  console.log("=======", ab)
});



