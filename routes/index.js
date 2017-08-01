var express = require('express');
var schedule = require("node-schedule");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var date = new Date(2017,7,31,16,03,0);
   var j = schedule.scheduleJob("test1", date, function(){
　　　　console.log("执行任务===================");
　 });


  res.json({ message: 'Bear updated!' });
});

module.exports = router;
