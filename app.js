var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	mongoose = require('mongoose');
	minuten = [];
	scoren = [];

server.listen(3000);

mongoose.connect('mongodb://dieter:blackdown10@kahana.mongohq.com:10048/scoreboard', function(err){
	if(err){
		console.log(err);
		console.log('mislukt, maar waarom??');
	}
	else{
		console.log('Connected');
	}
});

var scoreboardSchema = mongoose.Schema({
	id: Number,
	min: String,
	msg: String,
	score1: Number,
	created: {type: Date, default: Date.now}
});

var Update = mongoose.model('Update', scoreboardSchema);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/scoreboard.html');
});
app.get('/scoreboard.html', function (req, res) {
  res.sendfile(__dirname + '/scoreboard.html');
});
app.get('/admin.html', function (req, res) {
  res.sendfile(__dirname + '/admin.html');
});

app.use(express.static(__dirname + '/public')); //css

io.sockets.on('connection', function(socket){

	var query = Update.find({});
	query.sort('created').exec(function(err, docs){		//exec laat het werken
		if(err) throw err;
		socket.emit('load old updates', docs);
	});

	socket.on('send time', function(data){
		socket.minute = data;
		minuten.push(socket.minute);
		//updateMinutes();

	});
/*
	function updateMinutes(){
		io.sockets.emit('minuutjes', minuten);
	}
*/
	socket.on('send update', function(data){
	var newMsg = new Update({msg: data, min: socket.minute, score1: socket.score1});//document aanmaken
		newMsg.save(function(err){ //save
			if(err) throw  err;
		});
	io.sockets.emit('new update', {msg: data, min: socket.minute, score1: socket.score1});//iedereen kan het zien(ook ik)
	});

	socket.on('click', function(data){
		socket.score1 = data;
		scoren.push(socket.score1);
    });

    socket.on('click2', function(data){
        io.sockets.emit('scorehome-',data); 
    });

});