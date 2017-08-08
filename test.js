var sc = require('socket.io-client');
var ab = sc.connect("https://wrtc21.bigmarker.com:443", {
  secure: true,
  query: "uid=3958f03e6d28&rid=227f0fbcd6de"
});

ab.on('connect', function(){
  console.log("=======", ab)

    ab.emit('videoShare:load',{"__v":0,"youtubeLink":"https://www.youtube.com/watch?v=wzE2vBR7LJw","isMuted":0,"playingState":"1","eventTime":"0","videoType":"youtube","autoplay":999,"elapseTime":0,"conferenceId":"227f0fbcd6de","serverUrl":"https://wrtc21.bigmarker.com","keys":"uid=3958f03e6d28&rid=227f0fbcd6de","volume":"100","startAt":0,"startTime":1502175600,"_id":"59895d75b267fb504cf622d3","sendStatus":"0"})
});

ab.on('connect_failed', function(){
  console.log("=======", ab)
});



