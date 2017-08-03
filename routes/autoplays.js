var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Autoplay = mongoose.model('Autoplay');

var io = require('socket.io-client');

router.get('/list', function(req, res, next) {

    Autoplay.find({}, function(err,docs){
      if (err){
        res.end('Error');
        return next();
      }
      res.json(docs);
    });

});

router.post('/create', function(req, res, next) {
  console.log("========", req.body)
  var autoplay = new Autoplay(req.body)
  autoplay.save(function(err, autoplay){
    if (err){
      //res.end('error');
      res.json(err);
      return next();
    } else {
      res.json({status: 1});
    }
  });

});

module.exports = router;
