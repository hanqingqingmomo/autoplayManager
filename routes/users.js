var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Conference = mongoose.model('Conference');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/conference', function(req, res, next) {

    Conference.find({}, function(err,docs){
      if (err){
        res.end('Error');
        return next();
      }
      res.json(docs);
    });

});

module.exports = router;
