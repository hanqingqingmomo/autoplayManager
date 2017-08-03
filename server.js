var http = require('https')
var io = require('socket.io');


var server = http.createServer(function(req, res){ 
  // Send HTML headers and message
  res.writeHead(200,{ 'Content-Type': 'text/html' }); 
  res.end('<h1>Hello Socket Lover!</h1>');
});


server.listen(8080);

var socket = io.listen(server);


socket.on('connection', function(client){   
	//连接成功则执行下面的监听
	client.on('message',function(event){ 
		console.log('Received message from client!',event);
	});
	//断开连接callback
	client.on('disconnect',function(){
		console.log('Server has disconnected');
	});
});

