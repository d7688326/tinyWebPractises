var app = require('express')(), server = require('http').createServer(app);
server.listen(52123);
app.get('/', function (req,res){
	res.sendfile(__dirname + '/chatrooms.html');
});

var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
	socket.emit('hello',"socket connected!");  
    socket.on('addroom', function(data){
        socket.broadcast.emit('updateroom',data);
    });
    socket.on('sendmessage',function(data){
        socket.broadcast.emit('showmessage',data);
    });
});