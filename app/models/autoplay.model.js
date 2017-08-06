var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Autoplay = new Schema({
   conferenceId: String,
   serverUrl: String,
   keys: String,
   link: String,
   youtubeLink: String,
   isMuted: Number,
   playingState: String,
   eventTime: String,
   videoType: String,
   autoplay: Number,
   elapseTime: Number,
   volume: String,
   startAt: Number,
   startTime: String,
   hashedId: String,
   sendStatus: {type: String, default: 0},
   videoType: String
  });

mongoose.model('Autoplay', Autoplay);
