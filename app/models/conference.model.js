var mongoose = require('mongoose');
Schema = mongoose.Schema;

var Conference = new Schema({
  id:       String,
  serverUrl:  String,
  playDate: Date
});

mongoose.model('Conference', Conference);
