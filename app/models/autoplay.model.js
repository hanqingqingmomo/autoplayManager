var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Autoplay = new Schema({
   conferenceId: String,
   link: String,
   youtubeLink: String,
   isMuted: Number,
   playingState: String,
   //eventTime: Date,
   eventTime: String,
   videoType: String,
   autoplay: Number,
   elapseTime: Number,
   volume: String,
   startAt: Number,
   //startTime: Date,
   startTime: Date,
   hashedId: String,
   videoType: String
  });

mongoose.model('Autoplay', Autoplay);
