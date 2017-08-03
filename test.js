var sc = require('socket.io-client');
var ab = sc.connect("https://wrtc21.bigmarker.com:443", {
  secure: true,
  query: "uid=3958f03e6d28&rid=95715fb6caf6"
});

ab.on('connect', function(){
  console.log("=======", ab)

    ab.emit('videoShare:load', {
    youtubeLink: "https://www.youtube.com/watch?v=z53UT7UFQh0",
    isMuted: 0,
    eventTime: 0,
    elapseTime: 0,
    volume: 100,
    playingState: "1",
    autoplay: 999,
    startAt: 0
  })
});

ab.on('connect_failed', function(){
  console.log("=======", ab)
});



